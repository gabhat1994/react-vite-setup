import { type QuillOptionsStatic } from 'quill';
import { type IFilterXSSOptions } from 'xss';

export const EDITOR_ELEMENT_ID = 'rte-element';

export const EDITOR_ID = 'editor-container';

export const TOOLBAR_ID = 'toolbar';

export const ATTACHMENT_CONTAINER_CLASS = 'attachment_container';

export const ATTACHMENT_CLASS = 'attachment_link';

export const BLOCK_CONTAINER_CLASS = 'block_container';

export const IMAGE_CONTAINER_CLASS = 'image_container';

export const VIDEO_CONTAINER_CLASS = 'video_container';

export const LOADER_CLASS = 'loader';

export const REMOVE_CLASS = 'remove';

export const DOWNLOAD_CLASS = 'download';

export const FILE_NAME_CLASS = 'file_name';

export const SVG_ACTION_ICON_CLASS = 'action_icon_svg';

export const VIDEO_ICON = `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6432 9.15404C15.2698 9.54571 15.2698 10.4584 14.6432 10.85L1.52995 19.0458C0.863904 19.4621 -4.48227e-05 18.9832 -4.48227e-05 18.1978L-4.48227e-05 1.80629C-4.48227e-05 1.02085 0.863906 0.542008 1.52995 0.958288L14.6432 9.15404Z" fill="#0C0024"/></svg>`;

export const IMAGE_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.1566 19.1996H2.84333C2.30103 19.1996 1.78094 18.9842 1.39748 18.6007C1.01401 18.2173 0.798584 17.6972 0.798584 17.1549V2.84162C0.798584 2.29932 1.01401 1.77923 1.39748 1.39577C1.78094 1.0123 2.30103 0.796875 2.84333 0.796875H17.1566C17.6989 0.796875 18.219 1.0123 18.6024 1.39577C18.9859 1.77923 19.2013 2.29932 19.2013 2.84162V17.1549C19.2013 17.6972 18.9859 18.2173 18.6024 18.6007C18.219 18.9842 17.6989 19.1996 17.1566 19.1996ZM2.84333 2.84162V17.1549H17.1566V2.84162H2.84333ZM16.1342 15.1101H3.86571L6.93283 11.0206L7.95521 12.043L11.0223 7.9535L16.1342 15.1101ZM6.42164 8.97587C6.01492 8.97587 5.62485 8.8143 5.33725 8.5267C5.04965 8.2391 4.88808 7.84904 4.88808 7.44231C4.88808 7.03558 5.04965 6.64552 5.33725 6.35792C5.62485 6.07032 6.01492 5.90875 6.42164 5.90875C6.82837 5.90875 7.21844 6.07032 7.50604 6.35792C7.79364 6.64552 7.95521 7.03558 7.95521 7.44231C7.95521 7.84904 7.79364 8.2391 7.50604 8.5267C7.21844 8.8143 6.82837 8.97587 6.42164 8.97587Z" fill="#0C0024"/></svg>`;

export const ATTACHMENT_ICON = `<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 0C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3V19C0 19.7957 0.31607 20.5587 0.87868 21.1213C1.44129 21.6839 2.20435 22 3 22H15C15.7957 22 16.5587 21.6839 17.1213 21.1213C17.6839 20.5587 18 19.7957 18 19V7.342V7.34188C18 6.94222 17.92 6.5466 17.765 6.17825C17.6099 5.80997 17.3829 5.47638 17.0972 5.19705L17.097 5.19688L12.6572 0.855047L12.6571 0.855C12.0967 0.306987 11.344 9.75728e-05 10.5601 0H10.56H3ZM2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H10V5C10 5.79565 10.3161 6.55871 10.8787 7.12132C11.4413 7.68393 12.2044 8 13 8H16V19C16 19.2652 15.8946 19.5196 15.7071 19.7071C15.5196 19.8946 15.2652 20 15 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V3C2 2.73478 2.10536 2.48043 2.29289 2.29289ZM15.0577 6L12 3.00977V5C12 5.26522 12.1054 5.51957 12.2929 5.70711C12.4804 5.89464 12.7348 6 13 6H15.0577ZM6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H12C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11H6ZM6 15C5.44772 15 5 15.4477 5 16C5 16.5523 5.44772 17 6 17H9C9.55229 17 10 16.5523 10 16C10 15.4477 9.55229 15 9 15H6Z" fill="#0C0024"/></svg>`;

export const ERROR_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9ZM11.2929 10.2929C11.4804 10.1054 11.7348 10 12 10C12.2652 10 12.5196 10.1054 12.7071 10.2929C12.8946 10.4804 13 10.7348 13 11V16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16V11C11 10.7348 11.1054 10.4804 11.2929 10.2929Z" fill="#0C0024"/></svg>`;

export const DOWNLOAD_ICON = `<svg class="${SVG_ACTION_ICON_CLASS}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.4803 4.07494C16.4966 4.7986 17.2619 5.82103 17.67 6.99998C18.5798 7.11282 19.441 7.47362 20.1595 8.04291C20.8781 8.61221 21.4263 9.3681 21.7442 10.228C22.0621 11.0878 22.1376 12.0185 21.9622 12.9183C21.7869 13.8181 21.3675 14.6524 20.75 15.33C20.6563 15.4366 20.5409 15.5221 20.4116 15.5808C20.2823 15.6394 20.142 15.6698 20 15.67C19.7569 15.6696 19.5223 15.5808 19.34 15.42C19.2401 15.3331 19.1585 15.2273 19.0999 15.1086C19.0412 14.99 19.0067 14.8609 18.9983 14.7288C18.99 14.5967 19.0079 14.4643 19.0511 14.3392C19.0943 14.214 19.1619 14.0988 19.25 14C19.6369 13.5674 19.89 13.032 19.9787 12.4585C20.0674 11.885 19.9879 11.2981 19.7497 10.7689C19.5116 10.2396 19.1251 9.79087 18.637 9.47691C18.1489 9.16295 17.5803 8.99728 17 8.99998H16.94C16.706 9.0047 16.4778 8.92723 16.2951 8.78105C16.1124 8.63488 15.9867 8.42926 15.94 8.19998C15.7564 7.29575 15.2658 6.4828 14.5514 5.89888C13.837 5.31496 12.9427 4.99597 12.02 4.99597C11.0973 4.99597 10.203 5.31496 9.48858 5.89888C8.77417 6.4828 8.2836 7.29575 8.09999 8.19998C8.05324 8.42926 7.92756 8.63488 7.74484 8.78105C7.56213 8.92723 7.33393 9.0047 7.09999 8.99998H6.99999C6.41967 8.99728 5.85103 9.16295 5.36298 9.47691C4.87492 9.79087 4.4884 10.2396 4.25026 10.7689C4.01212 11.2981 3.93258 11.885 4.02127 12.4585C4.10997 13.032 4.3631 13.5674 4.74999 14C4.86411 14.0927 4.9564 14.2093 5.02027 14.3417C5.08415 14.4742 5.11805 14.619 5.11956 14.766C5.12107 14.913 5.09015 15.0585 5.029 15.1922C4.96785 15.3259 4.87798 15.4445 4.76579 15.5395C4.65359 15.6345 4.52183 15.7035 4.37989 15.7418C4.23795 15.7801 4.08931 15.7866 3.94458 15.7608C3.79984 15.7351 3.66255 15.6778 3.5425 15.5929C3.42244 15.5081 3.32257 15.3978 3.24999 15.27C2.64913 14.5913 2.24409 13.762 2.07819 12.8708C1.9123 11.9796 1.99178 11.0601 2.30815 10.2107C2.62452 9.3612 3.16587 8.61371 3.87429 8.04817C4.5827 7.48263 5.43154 7.12032 6.32999 6.99998C6.73803 5.82103 7.50342 4.7986 8.51965 4.07494C9.53589 3.35129 10.7524 2.9624 12 2.9624C13.2475 2.9624 14.4641 3.35129 15.4803 4.07494ZM13 17.64L14.31 16.38C14.402 16.2777 14.5141 16.1955 14.6393 16.1385C14.7645 16.0815 14.9002 16.051 15.0377 16.0488C15.1753 16.0466 15.3118 16.0729 15.4387 16.1259C15.5657 16.1788 15.6803 16.2575 15.7755 16.3568C15.8707 16.4561 15.9444 16.574 15.9919 16.7031C16.0395 16.8322 16.0599 16.9697 16.0518 17.107C16.0438 17.2444 16.0075 17.3786 15.9453 17.5013C15.883 17.6239 15.7961 17.7324 15.69 17.82L12.69 20.72C12.5046 20.8987 12.2575 20.999 12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L8.29 17.71C8.19676 17.6168 8.1228 17.5061 8.07234 17.3842C8.02188 17.2624 7.99591 17.1319 7.99591 17C7.99591 16.8681 8.02188 16.7376 8.07234 16.6158C8.1228 16.4939 8.19676 16.3832 8.29 16.29C8.38324 16.1968 8.49393 16.1228 8.61575 16.0723C8.73757 16.0219 8.86814 15.9959 9 15.9959C9.13186 15.9959 9.26243 16.0219 9.38425 16.0723C9.50607 16.1228 9.61676 16.1968 9.71 16.29L11 17.59V12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12V17.64Z" fill="#0C0024"/></svg>`;

export const REMOVE_ICON = `<svg class="${SVG_ACTION_ICON_CLASS}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.225 4.81099C6.0364 4.62883 5.7838 4.52803 5.5216 4.53031C5.25941 4.53259 5.00859 4.63776 4.82318 4.82317C4.63778 5.00858 4.53261 5.25939 4.53033 5.52158C4.52805 5.78378 4.62884 6.03638 4.811 6.22499L10.586 12L4.81 17.775C4.71449 17.8672 4.63831 17.9776 4.5859 18.0996C4.53349 18.2216 4.50591 18.3528 4.50475 18.4856C4.5036 18.6184 4.5289 18.75 4.57918 18.8729C4.62946 18.9958 4.70372 19.1075 4.79761 19.2014C4.8915 19.2953 5.00315 19.3695 5.12605 19.4198C5.24895 19.4701 5.38062 19.4954 5.5134 19.4942C5.64618 19.4931 5.7774 19.4655 5.89941 19.4131C6.02141 19.3607 6.13176 19.2845 6.224 19.189L12 13.414L17.775 19.189C17.9636 19.3711 18.2162 19.4719 18.4784 19.4697C18.7406 19.4674 18.9914 19.3622 19.1768 19.1768C19.3622 18.9914 19.4674 18.7406 19.4697 18.4784C19.472 18.2162 19.3712 17.9636 19.189 17.775L13.414 12L19.189 6.22499C19.3712 6.03638 19.472 5.78378 19.4697 5.52158C19.4674 5.25939 19.3622 5.00858 19.1768 4.82317C18.9914 4.63776 18.7406 4.53259 18.4784 4.53031C18.2162 4.52803 17.9636 4.62883 17.775 4.81099L12 10.586L6.225 4.80999V4.81099Z" fill="#0C0024"/></svg>`;

export const xssOptions: IFilterXSSOptions = {
  whiteList: {
    a: ['class', 'target', 'href', 'title'],
    br: [],
    em: [],
    h1: ['class'],
    h2: ['class'],
    h3: ['class'],
    h4: ['class'],
    h5: ['class'],
    h6: ['class'],
    li: ['class'],
    ol: ['class'],
    p: ['class'],
    s: [],
    span: ['class'],
    strong: ['class'],
    sub: ['class'],
    u: [],
    ul: ['class'],
    img: ['src'],
    div: ['class'],
    video: ['controls', 'name'],
    source: ['src'],
    svg: ['width', 'height', 'viewBox', 'fill'],
    path: ['d', 'fill-rule', 'clip-rule', 'fill'],
  },
  onTagAttr: (tag: string, name: string, value: string) => {
    const isJavaScriptProtocol =
      // eslint-disable-next-line no-control-regex
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

    if (
      (tag === 'img' || tag === 'source') &&
      name === 'src' &&
      // We need to keep this lint rule in so we can check for code injection
      // eslint-disable-next-line no-script-url
      (value.toLowerCase().includes('javascript:') ||
        isJavaScriptProtocol.test(value.toLocaleLowerCase()))
    ) {
      return `src="about:blank"`;
    }

    if (
      tag === 'a' &&
      name === 'href' &&
      // eslint-disable-next-line no-script-url
      (value.toLowerCase().includes('javascript:') ||
        isJavaScriptProtocol.test(value.toLocaleLowerCase()))
    ) {
      return `href="about:blank"`;
    }

    if (tag === 'a' && name === 'href') {
      return `href="${value.replace(/http[s]*/i, (v) => v.toLowerCase())}"`;
    }

    if (
      (tag === 'svg' || tag === 'path') &&
      // eslint-disable-next-line no-script-url
      (value.toLowerCase().includes('javascript:') ||
        isJavaScriptProtocol.test(value.toLocaleLowerCase()))
    ) {
      return `${name}="about:blank"`;
    }
    return undefined;
  },
};

export const domPurifyOptions = {
  ALLOWED_TAGS: [
    'a',
    'br',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'li',
    'ol',
    'p',
    's',
    'span',
    'strong',
    'sub',
    'u',
    'ul',
    'img',
    'div',
    'video',
    'source',
    'svg',
    'path',
  ],
  ADD_ATTR: ['id', 'contenteditable', 'target', 'class'],
};

export const MODULES: QuillOptionsStatic['modules'] = {
  toolbar: [
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'left',
    'center',
    'right',
    'justify',
    'ordered',
    'bullet',
    'header1',
    'header2',
    'image',
    'video',
    'attachment',
  ],
};

export const MODULES_ADD_REFERENCE: QuillOptionsStatic['modules'] = {
  toolbar: [
    'bold',
    'italic',
    'underline',
    'strike',
    'left',
    'justify',
    'center',
    'right',
    'bullet',
    'header1',
    'header2',
    'link',
  ],
};

export const MODULES_MOBILE: QuillOptionsStatic['modules'] = {
  toolbar: [
    'left',
    'center',
    'right',
    'justify',
    'ordered',
    'bullet',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'header1',
    'header2',
    'image',
    'video',
    'attachment',
  ],
};

export const MODULES_MOBILE_ADD_REFERENCE: QuillOptionsStatic['modules'] = {
  toolbar: [
    'left',
    'center',
    'right',
    'justify',
    'ordered',
    'bullet',
    'bold',
    'italic',
    'underline',
    'strike',
    'header1',
    'header2',
    'link',
  ],
};