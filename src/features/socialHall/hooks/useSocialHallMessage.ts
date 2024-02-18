import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';

import { type UserOutput, type Maybe } from '@/apollo/generated/types';
import { type EventUserOutputFragment } from '@/apollo/graphql/fragments';
import UserJoins from '@/assets/media/user-joins.wav';
import UserLeave from '@/assets/media/user-leaves.wav';
import {
  type RtmClient,
  type RtmMessage,
  type RtmTextMessage,
} from '@/facade/agoraRTM';
import { useAudio } from '@/hooks/audioPlay';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useError } from '@/hooks/useError';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import {
  MessageType,
  type ExtendedRtmChannel,
  type SocialHallChat,
} from '@/screens/SocialHall/types';
import { SocialHallUtils } from '@/utils/socialHall';
import { SocialHallMessageUtils } from '@/utils/socialHallMessage';
import { useCreateMessage } from './useCreateMessage';
import { useInitializeAgora } from './useInitializeAgora';
import { type GroupUserHashMap } from '../types';

let rtmEngine: RtmClient;
let rtmChannel: ExtendedRtmChannel | null;
let memberJoinedCount = 0;

export const useSocialHallMessage = () => {
  const { flags } = useLaunchDarkly();
  const { logError } = useError();
  const { createMessage } = useCreateMessage();
  const { activeSocialHallGroup } = useSocialHallContext();
  const [messages, setMessages] = useState<Array<SocialHallChat>>([]);
  const [rtmInstance, setRtmInstance] = useState<RtmClient | null>();
  const { user } = useAuth();
  const [memberJoinId, setMemberJoinId] = useState<string>();
  const [memberLeaveId, setMemberLeaveId] = useState<string>();
  const [joinedUsers, setJoinedUsers] = useState<
    Maybe<EventUserOutputFragment>[]
  >([]);
  const [joinLeaveMember, setJoinLeaveMember] =
    useState<EventUserOutputFragment>();
  const [playUserJoinsAudio] = useAudio(UserJoins);
  const [playUserLeavesAudio] = useAudio(UserLeave);
  const [showUserJoined, setShowUserJoined] = useState(false);
  const [showUserLeave, setShowUserLeave] = useState(false);
  const [tempSHMembers, setTempSHMembers] =
    useState<Maybe<EventUserOutputFragment>[]>();
  const groupUsersHashMap = useRef<GroupUserHashMap>({});

  const { initializeAgoraMessagingEngine } = useInitializeAgora();

  useEffect(() => {
    groupUsersHashMap.current = SocialHallMessageUtils.getUserHashMap(
      (activeSocialHallGroup?.users || []) as EventUserOutputFragment[],
    );
  }, [activeSocialHallGroup?.users]);

  const onCloseAgoraMessagingConnection =
    useCallback(async (): Promise<void> => {
      try {
        if (
          flags.socialHallMessaging &&
          rtmChannel &&
          rtmChannel?.joinState !== 'LEFT'
        ) {
          rtmChannel?.removeAllListeners();
          rtmEngine?.removeAllListeners();
          await rtmChannel?.leave();
          await rtmEngine?.logout();
          setRtmInstance(null);
          rtmChannel = null;
        }
      } catch (err) {
        logError(err, '');
      }
    }, [flags, logError]);

  const onMediaUploadSuccess = useCallback(
    (msgs: SocialHallChat[], id: string): SocialHallChat[] =>
      msgs.map((msg) =>
        msg._id === id
          ? {
              ...msg,
              status: 'delivered',
              media:
                msg.message instanceof Blob
                  ? SocialHallUtils.getMedia(URL.createObjectURL(msg.message))
                  : undefined,
            }
          : msg,
      ),
    [],
  );
  const createUserJoinedMessage = useCallback((userId: string) => {
    if (memberJoinedCount! < 1) {
      memberJoinedCount! += 1;
      setMemberJoinId(userId);
    }
  }, []);

  useEffect(() => {
    if (!activeSocialHallGroup?.users) {
      return;
    }
    const membersJoined = activeSocialHallGroup?.users.filter(
      (elem) =>
        tempSHMembers && !tempSHMembers.find((item) => elem?._id === item?._id),
    );
    setJoinedUsers(membersJoined as UserOutput[]);
    const member = activeSocialHallGroup?.users.find(
      (item) => item?._id === memberJoinId,
    );
    if (!member) {
      return;
    }
    setJoinLeaveMember(member as UserOutput);
    const newMessage = createMessage(
      t('noumena.socialhall.message.userJoined', {
        firstName: member.firstName,
      }),
      member._id,
      groupUsersHashMap.current,
      MessageType.NOTIFICATION,
      true,
    );
    const newMultipleMessage = createMessage(
      t('noumena.socialhall.message.More_people_joined', {
        numberOfUser: membersJoined.length,
      }),
      membersJoined[0]?._id!,
      groupUsersHashMap.current,
      MessageType.NOTIFICATION,
      true,
    );
    setMessages((msgs) => [
      ...msgs,
      membersJoined.length > 1 ? newMultipleMessage : newMessage,
    ]);
    if (activeSocialHallGroup.users.length <= 5) {
      playUserJoinsAudio();
    }
    setShowUserJoined(true);
    setMemberJoinId('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSocialHallGroup?.users, memberJoinId]);

  const createUserLeftMessage = useCallback((userId: string) => {
    setMemberLeaveId(userId);
  }, []);

  useEffect(() => {
    if (!tempSHMembers) {
      return;
    }
    const memberIndex = tempSHMembers.findIndex(
      (item) => item?._id === memberLeaveId,
    );

    if (memberIndex === -1) {
      return;
    }

    const member = tempSHMembers[memberIndex]!;
    setTempSHMembers((members) => {
      members?.splice(memberIndex!, 1);
      return members;
    });

    setJoinLeaveMember(member);
    const newMessage = createMessage(
      t('noumena.socialhall.message.userLeft', {
        firstName: member.firstName,
      }),
      member._id,
      groupUsersHashMap.current,
      MessageType.NOTIFICATION,
      true,
    );
    setMessages((msgs) => [...msgs, newMessage]);
    setShowUserLeave(true);
    playUserLeavesAudio();
    setMemberLeaveId('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberLeaveId, createMessage, playUserLeavesAudio]);

  const onChannelMessage = useCallback(
    async (message, uid, media?): Promise<void> => {
      const messageType = media ? MessageType.IMAGE : MessageType.TEXT;
      const messageData = media || message.text;
      if (groupUsersHashMap.current[uid]) {
        setMessages((msgs) => [
          ...msgs,
          createMessage(
            messageData,
            uid,
            groupUsersHashMap.current,
            messageType,
            true,
          ),
        ]);
      }
    },
    [createMessage, setMessages],
  );

  const startMessaging = useCallback(async () => {
    try {
      if (!flags.socialHallMessaging) {
        return;
      }
      const socialHallMembers = activeSocialHallGroup?.users;
      rtmEngine = await initializeAgoraMessagingEngine();
      await rtmEngine.login({
        uid: user?._id!,
        token: activeSocialHallGroup?.rtmToken!,
      });

      rtmChannel = rtmEngine.createChannel(activeSocialHallGroup?.channelName!);

      setRtmInstance(rtmEngine);
      await rtmChannel?.join();
      rtmChannel.on(
        'ChannelMessage',
        async (message: RtmMessage, uid: string) => {
          if (message.messageType === 'TEXT') {
            try {
              // In-case message is agora subscription no action required here
              JSON.parse(message.text);
            } catch (err) {
              onChannelMessage(message, uid);
            }
          }
          if (message.messageType === 'IMAGE') {
            const blob = await rtmEngine.downloadMedia(message.mediaId);
            onChannelMessage(message, uid, blob);
          }
        },
      );
      rtmChannel.on('MemberJoined', createUserJoinedMessage);
      if (socialHallMembers) {
        const tempSH = [...socialHallMembers];
        setTempSHMembers(tempSH as UserOutput[]);
      }
      rtmChannel.on('MemberLeft', createUserLeftMessage);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [
    user?._id,
    createUserLeftMessage,
    createUserJoinedMessage,
    onChannelMessage,
    activeSocialHallGroup?.rtmToken,
    activeSocialHallGroup?.channelName,
    activeSocialHallGroup?.users,
    flags.socialHallMessaging,
    initializeAgoraMessagingEngine,
  ]);

  const onSendP2PMessage = useCallback(
    async (message: string, peerId: string): Promise<boolean> => {
      const { hasPeerReceived } = await rtmEngine.sendMessageToPeer(
        { text: message } as RtmMessage,
        peerId,
        {
          enableHistoricalMessaging: true,
          enableOfflineMessaging: true,
        },
      );

      return hasPeerReceived;
    },
    [],
  );

  const onSendRemoteMessage = useCallback(
    async (
      message: string | File,
      onSendMessage: (message: string | Blob) => Promise<void>,
    ) => {
      let newMessage: SocialHallChat;

      if (message instanceof File) {
        const blob = await fetch(URL.createObjectURL(message)).then((res) =>
          res.blob(),
        );
        newMessage = createMessage(
          blob,
          user?._id!,
          groupUsersHashMap.current,
          MessageType.IMAGE,
        );
        setMessages((msgs) => [...msgs, newMessage]);
        await onSendMessage(blob);
      }

      if (typeof message === 'string') {
        newMessage = createMessage(
          message,
          user?._id!,
          groupUsersHashMap.current,
        );
        setMessages((msgs) => [...msgs, newMessage]);
        await onSendMessage(message);
      }
      setMessages((msgs) =>
        onMediaUploadSuccess(msgs, newMessage._id as string),
      );
    },
    [createMessage, user?._id, onMediaUploadSuccess],
  );

  const onSendTextMessage = useCallback(async (text: string) => {
    if (rtmEngine && rtmChannel) {
      const rtmMessage = { text } as RtmTextMessage;
      await rtmChannel?.sendMessage(rtmMessage, {
        enableHistoricalMessaging: true,
        enableOfflineMessaging: true,
      });
    }
  }, []);

  const resetMembersNotification = useCallback(() => {
    if (tempSHMembers)
      setTempSHMembers([...new Set([...tempSHMembers, ...joinedUsers])]);
    memberJoinedCount = 0;
    setJoinedUsers([]);
  }, [joinedUsers, tempSHMembers]);

  const onSendImageMessage = useCallback(async (file: Blob) => {
    if (rtmChannel) {
      const mediaMessage = await rtmEngine.createMediaMessageByUploading(file, {
        messageType: 'IMAGE',
        fileName: 'agora.jpg',
        description: 'send image',
        width: 100,
        height: 200,
      });

      await rtmChannel.sendMessage(mediaMessage);
    }
  }, []);

  return {
    messages,
    rtmEngine,
    rtmChannel,
    rtmInstance,
    setMessages,
    createMessage,
    startMessaging,
    onSendTextMessage,
    onSendImageMessage,
    onSendRemoteMessage,
    onMediaUploadSuccess,
    createUserLeftMessage,
    createUserJoinedMessage,
    onCloseAgoraMessagingConnection,
    setShowUserJoined,
    setShowUserLeave,
    setJoinedUsers,
    joinedUsers,
    showUserJoined,
    showUserLeave,
    joinLeaveMember,
    onSendP2PMessage,
    resetMembersNotification,
  };
};

export default useSocialHallMessage;
