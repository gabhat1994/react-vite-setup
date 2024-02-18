const getColorByNoumType = (type: string) => {
  let bgColor;
  switch (type.toLowerCase()) {
    case 'project':
      bgColor = '--text-badge-chambers-project-highlighted';
      break;
    case 'home':
      bgColor = '--text-badge-chambers-social-highlighted';
      break;
    case 'social':
      bgColor = '--text-badge-chambers-social-highlighted';
      break;
    case 'special':
      bgColor = '--text-badge-chambers-special-highlighted';
      break;
    case 'investment':
      bgColor = '--text-badge-chambers-investment-highlighted';
      break;
    case 'story':
      bgColor = '--text-badge-chambers-story-highlighted';
      break;
    case 'member':
      bgColor = '--text-badge-chambers-member-highlighted';
      break;
    case 'rise_application':
      bgColor = '--text-badge-chambers-special-highlighted';
      break;
    case 'rise':
      bgColor = '--text-badge-chambers-special-highlighted';
      break;
  }
  return bgColor;
};

export default getColorByNoumType;
