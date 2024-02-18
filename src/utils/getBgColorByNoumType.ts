const getBgColorByNoumType = (type: string) => {
  let bgColor;
  switch (type.toLowerCase()) {
    case 'project':
      bgColor = '--bg-badge-chambers-project-default';
      break;
    case 'home':
      bgColor = '--bg-card-chambers-social-default';
      break;
    case 'social':
      bgColor = '--bg-badge-chambers-social-default';
      break;
    case 'special':
      bgColor = '--bg-badge-chambers-special-default';
      break;
    case 'investment':
      bgColor = '--bg-badge-chambers-investment-default';
      break;
    case 'story':
      bgColor = '--bg-badge-chambers-story-default';
      break;
    case 'member':
      bgColor = '--bg-badge-chambers-member-default';
      break;
    case 'rise_application':
      bgColor = '--bg-badge-chambers-special-default';
      break;
    case 'rise':
      bgColor = '--bg-badge-chambers-special-default';
  }
  return bgColor;
};
export default getBgColorByNoumType;
