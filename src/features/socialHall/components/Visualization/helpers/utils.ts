import {
  type IncreaseByPercentage,
  type ScreenDimensions,
  type SocialHallParticle,
  type SocialHallData,
} from '../types';

type CacheData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: SocialHallParticle | any;
};

type GroupCacheData = {
  processed: Array<SocialHallParticle>;
  unprocessed: Array<SocialHallData>;
};

export const getIncreaseByPercentage = (
  increaseByPercentage: IncreaseByPercentage,
): ScreenDimensions => {
  if (typeof increaseByPercentage === 'number') {
    return { width: increaseByPercentage, height: increaseByPercentage * 0.5 };
  }
  return increaseByPercentage;
};

export const groupProcessData = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  cache: Array<SocialHallParticle> = [],
  socialHallData: Array<SocialHallData>,
): GroupCacheData => {
  const filtered: {
    unprocessed: SocialHallData[];
    processed: SocialHallParticle[];
  } = { unprocessed: [], processed: [] };
  // socialHallData is not yet processed.
  if (!cache.length) {
    return { unprocessed: socialHallData, processed: [] };
  }

  const cachedData = cacheBuilder(cache);
  // eslint-disable-next-line consistent-return
  socialHallData.forEach((data) => {
    // New group found
    // Members removed from group
    if (
      !cachedData[data.id] ||
      (cachedData[data.id] &&
        cachedData[data.id].children.length !== data.children.length)
    ) {
      return filtered.unprocessed.push(data);
    }
    filtered.processed.push({ ...cachedData[`${data.id}`], title: data.title });
  });
  return filtered;
};

const cacheBuilder = (cache: Array<SocialHallParticle>): CacheData => {
  let ids: CacheData = {};
  if (cache) {
    cache.forEach((item) => {
      ids = { ...ids, [item.id]: item };
      item.children.forEach((child) => {
        ids = { ...ids, [`${item.id}_${child.id}`]: {} };
      });
    });
  }
  return ids;
};

export const topTooltipPath = (
  width: number,
  height: number,
  offset: number,
  radius: number = 0,
  px: number = 0,
  py: number = 0,
) => {
  const left = px - width / 2;
  const right = px + width / 2;
  const top = py - offset - height;
  const bottom = py - offset;
  return `M ${px},${py} 
  L ${px - offset},${bottom} 
  H ${left + radius}
  Q ${left},${bottom} ${left},${bottom - radius}  
  V ${top + radius}   
  Q ${left},${top} ${left + radius},${top}
  H ${right - radius}
  Q ${right},${top} ${right},${top + radius}
  V ${bottom - radius}
  Q ${right},${bottom} ${right - radius},${bottom}
  H ${px + offset} 
  L ${px},${py} z`;
};

export const drawPathForRound = (p: SocialHallParticle): string => {
  if (p.groupCoords?.length && p.arcCoords?.length) {
    let path = `M ${p.groupCoords[0].x} ${p.groupCoords[0].y}`;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= Math.min(p.groupCoords.length, 5 * 2) - 1; i++) {
      path += `Q ${p.arcCoords[i - 1].x} ${p.arcCoords[i - 1].y}  ${
        p.groupCoords[i].x
      } ${p.groupCoords[i].y} `;
    }
    path += `Q ${p.arcCoords[p.arcCoords.length - 1].x} ${
      p.arcCoords[p.arcCoords.length - 1].y
    }  ${p.groupCoords[0].x} ${p.groupCoords[0].y} `; // link between last point and first point
    path += 'z';
    return path;
  }
  return '';
};
