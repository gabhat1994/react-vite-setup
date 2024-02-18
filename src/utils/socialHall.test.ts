import { addMilliseconds } from 'date-fns';
import { KnockStatusEnum } from '@/features/socialHall/components/SideBar/types';
import { MainEventStartTimer } from '@/screens/SocialHall/const';
import { SocialHallUtils } from './socialHall';
import { knockMock, declinedKnocks, userOutput } from './socialHallMock';

describe('getEventTimeDifference', () => {
  test('get event time difference', () => {
    const currentDate = new Date();
    expect(
      SocialHallUtils.getEventTimeDifference(
        addMilliseconds(currentDate, 100),
        currentDate,
      ),
    ).toBe(100);
  });
});

describe('getGroupKnockDetails', () => {
  test('knock is accepted', () => {
    expect(SocialHallUtils.getGroupKnockDetails(knockMock, '12')).toEqual({
      status: KnockStatusEnum.Accepted,
      knock: knockMock[0],
    });
  });
  test('knock is knocking', () => {
    expect(SocialHallUtils.getGroupKnockDetails(knockMock, '52')).toEqual({
      status: KnockStatusEnum.IsKnocking,
      knock: knockMock[4],
    });
  });
  test('knock is normal', () => {
    expect(SocialHallUtils.getGroupKnockDetails(knockMock, '52')).toEqual({
      status: KnockStatusEnum.IsKnocking,
      knock: knockMock[4],
    });
  });
});

describe('getKnockDetails', () => {
  test('knock is knocking', () => {
    expect(SocialHallUtils.getKnockDetails(knockMock, '52')).toEqual({
      status: KnockStatusEnum.IsKnocking,
      knock: knockMock[4],
    });
  });
  test('knock is knocked', () => {
    expect(SocialHallUtils.getKnockDetails(knockMock, '62')).toEqual({
      status: KnockStatusEnum.IsKnocking,
      knock: knockMock[5],
    });
  });
  test('knock is normal', () => {
    expect(SocialHallUtils.getKnockDetails(knockMock, '32')).toEqual({
      status: KnockStatusEnum.Normal,
      knock: knockMock[2],
    });
  });
});

describe('getRemainingTimeForMainEventOrEndEvent', () => {
  test('get Remaining Time For Main Event Or End Event', () => {
    const currentDate = new Date();
    expect(
      SocialHallUtils.getRemainingTimeForMainEventOrEndEvent(
        `${addMilliseconds(currentDate, MainEventStartTimer)}`,
      ),
    ).toBeTruthy();
  });
});

describe('getUniqueDeclinedKnocks', () => {
  test('only declined knocks', () => {
    expect(SocialHallUtils.getUniqueDeclinedKnocks([], declinedKnocks)).toEqual(
      declinedKnocks,
    );
  });
});

describe('isUserInGroupCall', () => {
  test('test true', () => {
    expect(SocialHallUtils.isUserInGroupCall('2', userOutput)).toBeTruthy();
  });
  test('test false', () => {
    expect(SocialHallUtils.isUserInGroupCall('12', userOutput)).toBeFalsy();
  });
});

describe('updateUser', () => {
  const userOutputId = userOutput.map((item) => item._id);
  test('addUsers', () => {
    expect(SocialHallUtils.updateUsers(true, 10, userOutputId)).toEqual([
      ...userOutputId,
      10,
    ]);
  });
  test('remoteUser', () => {
    expect(SocialHallUtils.updateUsers(false, '1', userOutputId)).toEqual(
      userOutputId.filter((item) => item !== '1'),
    );
  });
});
