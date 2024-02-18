/* eslint-disable no-plusplus */
import { boundingOffset } from '../const';
import {
  type SocialHallVizProps,
  type SocialHallData,
  type SocialHallOutput,
  type Coords,
  type ICirclePacking,
  type ScreenDimensions,
  type SocialHallParticle,
} from '../types';
import { getIncreaseByPercentage, groupProcessData } from './utils';

type RadCoords = Coords & {
  radius: number;
};
class SocialHallNavigation {
  private width: number;

  private height: number;

  private topPadding: number;

  private bottomPadding: number;

  private circleGutterSpace: number; // gutter space between 2 big circle

  private maxCollisionCheckCount; //

  private data: Array<SocialHallData>;

  private cacheCoords: SocialHallOutput;

  private particles: Array<SocialHallParticle> = [];

  private increaseByPercentage: ScreenDimensions;

  /**
   * @param increaseByPercentage      lib will increase the width and height of viewport if empty coordinates is not found
   * @param maxCollisionCheckCount    lib will try `maxCollisionCheckCount` times to fit circle within the minWidth and minHeight, post that it will keep increasing the space, until the circles fits.
   */
  constructor({
    data,
    cache,
    minWidth,
    minHeight,
    topPadding,
    maxCollisionCheckCount,
    increaseByPercentage,
    bottomPadding,
  }: SocialHallVizProps) {
    this.data = data;
    this.topPadding = topPadding || 0;
    this.bottomPadding = bottomPadding || 0;
    this.circleGutterSpace = 120;
    /*
      loop number of times in order to find empty coords to draw the UI
      higher the number closer the cirles smaller the viewport size, but
      this will lower the performance
    */
    this.maxCollisionCheckCount = maxCollisionCheckCount || 750;
    this.cacheCoords = cache || {
      width: minWidth,
      height: minHeight,
      particles: [],
    };
    this.width = this.cacheCoords.width;
    this.height = this.cacheCoords.height;
    this.increaseByPercentage = getIncreaseByPercentage(
      increaseByPercentage || 10,
    );
  }

  private randomIntFromRange(): Coords {
    const minHeight = this.circleGutterSpace + this.topPadding;
    return {
      xCoords: Math.floor(
        Math.random() * (this.width - this.circleGutterSpace * 2 + 1) +
          this.circleGutterSpace,
      ),
      yCoords: Math.floor(
        Math.random() *
          (this.height -
            this.bottomPadding -
            (this.circleGutterSpace * 2 + 1)) +
          minHeight,
      ),
    };
  }

  // Method detects 2 circle collides or not.
  private isCollision(circle1: RadCoords, circle2: RadCoords): boolean {
    const xDist = circle1.xCoords - circle2.xCoords;
    const yDist = circle1.yCoords - circle2.yCoords;
    const radius = circle1.radius + circle2.radius + this.circleGutterSpace;
    return xDist * xDist + yDist * yDist <= radius * radius;
  }

  // Method calculates outer circle radius basis on provided childCount
  // eslint-disable-next-line class-methods-use-this
  private computeRadius(data: Array<SocialHallData>): Array<SocialHallData> {
    return data.map((item) => {
      const childCount = Math.min(item.children.length, 5);
      // Radius of the bounding box circle
      const boundingRadius =
        childCount <= 2
          ? item.radius * childCount
          : Math.sqrt((Math.PI * (item.radius * item.radius) * childCount) / 2);

      return {
        ...item,
        radius:
          Math.ceil(boundingRadius) + (childCount > 1 ? boundingOffset : 0),
      };
    });
  }

  // Method add child circles inside parent
  private circlePacking(
    data: SocialHallData,
    boundingCircleXCoords: number,
    boundingCircleYCoords: number,
  ): {
    children: Array<ICirclePacking>;
    groupCoords: Array<{ x: number; y: number }>;
    arcCoords: Array<{ x: number; y: number }>;
    moreChildren: number;
  } {
    const children: Array<ICirclePacking> = [];
    const childCount = data.children.length;
    const moreChildren = childCount - Math.min(childCount, 5);
    const groupCoords: Array<{ x: number; y: number }> = [];
    const boundingRadius =
      data.radius +
      (childCount === 1 ? 1 : childCount - 1) * childCount +
      boundingOffset;
    for (let i = 0; i < childCount; i++) {
      // Incase of only 1 circle
      let changeY = boundingCircleYCoords - data.radius;
      let changeX = boundingCircleXCoords - data.radius;

      const alpha = ((2 * Math.PI) / Math.min(childCount, 5)) * i;
      if (childCount > 1) {
        // changeY = boundingCircleYCoords + Math.sin((degree * Math.PI) / 180) * boundingRadius - data.radius;
        // changeX = boundingCircleXCoords + Math.cos((degree * Math.PI) / 180) * boundingRadius - data.radius;
        changeY =
          Math.sin(alpha) * boundingRadius +
          boundingCircleYCoords -
          data.radius;
        changeX =
          Math.cos(alpha) * boundingRadius +
          boundingCircleXCoords -
          data.radius;
        // changeX = (data.xCoords ?? 0) + R * Math.cos(alpha);
        // changeY = (data.yCoords ?? 0) + R * Math.sin(alpha);
      }

      const xCoords = Math.round(changeX * 1000) / 1000;
      const yCoords = Math.round(changeY * 1000) / 1000;

      // calculate group coordinates to link between child
      const x0 = xCoords + data.children[i].radius * Math.sin(alpha);
      const y0 = yCoords - data.children[i].radius * Math.cos(alpha);
      const x1 = xCoords - data.children[i].radius * Math.sin(alpha);
      const y1 = yCoords + data.children[i].radius * Math.cos(alpha);
      groupCoords.push({ x: x0, y: y0 });
      groupCoords.push({ x: x1, y: y1 });
      children.push({ ...data.children[i], xCoords, yCoords });
    }
    const arcCoords: Array<{ x: number; y: number }> =
      this.calculateArcCoordinates(
        children.slice(0, 5),
        boundingCircleXCoords - data.radius,
        boundingCircleYCoords - data.radius,
        boundingRadius,
      );
    return { children, groupCoords, arcCoords, moreChildren };
  }

  // eslint-disable-next-line class-methods-use-this
  private calculateArcCoordinates(
    children: Array<ICirclePacking>,
    x: number,
    y: number,
    r: number,
  ): Array<{ x: number; y: number }> {
    const childCount = children.length;
    if (childCount === 1) return [];
    const arcCoords: Array<{ x: number; y: number }> = [];
    const beta = Math.PI / childCount;
    for (let i = 0; i <= childCount * 2 - 1; i++) {
      // finding arc coordinate for Q
      const CenterBeta = (Math.PI / childCount) * i;
      if (i % 2 === 0) {
        arcCoords.push({
          x: children[i / 2].xCoords,
          y: children[i / 2].yCoords,
        });
      } else {
        const deltaX = Math.abs(r * Math.cos(beta)) * Math.cos(CenterBeta);
        const deltaY = Math.abs(r * Math.cos(beta)) * Math.sin(CenterBeta);
        const arcX = x + deltaX;
        const arcY = y + deltaY;
        arcCoords.push({ x: arcX, y: arcY });
      }
    }
    return arcCoords;
  }

  public generateCoords(): SocialHallOutput {
    let counter = 0;
    const { processed, unprocessed } = groupProcessData(
      this.cacheCoords.particles,
      this.data,
    );
    this.particles = [...processed];
    if (unprocessed.length) {
      this.computeRadius(unprocessed).forEach(({ radius }, index) => {
        let { xCoords, yCoords } = this.randomIntFromRange();
        for (let i = 0; i < this.particles.length; i++) {
          counter++;
          // Incase empty coords are not found increase the viewport proportinally
          if (counter === this.maxCollisionCheckCount) {
            counter = 0;
            this.width += (this.width * this.increaseByPercentage.width) / 100;
            this.height +=
              (this.height * this.increaseByPercentage.height) / 100;
          }
          const isCollision = this.isCollision(
            { xCoords, yCoords, radius },
            { ...this.particles[i] },
          );
          if (isCollision) {
            const coords = this.randomIntFromRange();
            xCoords = coords.xCoords;
            yCoords = coords.yCoords;
            i = -1;
          }
        }
        counter = 0;
        const circlePacking = this.circlePacking(
          unprocessed[index],
          xCoords + unprocessed[index].radius,
          yCoords + unprocessed[index].radius,
        );
        this.particles.push({
          ...unprocessed[index],
          xCoords,
          yCoords,
          radius,
          children: circlePacking.children,
          groupCoords: circlePacking.groupCoords,
          arcCoords: circlePacking.arcCoords,
          moreChildren: circlePacking.moreChildren,
        });
      });
    }

    return {
      width: this.width,
      height: this.height,
      particles: this.particles,
    };
  }
}

export default SocialHallNavigation;
