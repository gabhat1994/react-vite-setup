import { memo, useEffect, useMemo, useRef, useState } from 'react';
import avatar_m from '@/assets/icons/avatar-m.svg';
import { drawPathForRound, topTooltipPath } from './helpers/utils';
import { type ICirclePacking, type SocialHallParticle } from './types';
import {
  maxHeight,
  padding,
  distance,
  offset,
  boxRadius,
  SelectOuterRingColor,
  OuterRightColor,
  TooltipBackgroundColor,
  MoreBackgroundColor,
} from './const';

type CirclePackingProps = {
  particle: SocialHallParticle;
  onMemberPressed?: (
    selectedChild: ICirclePacking,
    parent: SocialHallParticle,
  ) => void;
};

export const CirclePacking = memo(
  ({ particle, onMemberPressed }: CirclePackingProps) => {
    const { children, moreChildren } = particle;
    const childrenToRender = useMemo(() => children.slice(0, 5), [children]);
    const lastChild = childrenToRender.slice(-1)[0];
    const refTextTitle = useRef<SVGTextElement>(null);
    const refTextSubTitle = useRef<SVGTextElement>(null);
    const [titleWidth, setTitleWidth] = useState<number>(0);
    const [subTitleWidth, setSubTitleWidth] = useState<number>(0);
    const [isTipShow, setTipShow] = useState<boolean>(false);

    // TODO height should be maxHeight or minHeight based on title counts
    const height = maxHeight;
    const width = useMemo(
      () => Math.max.apply(null, [titleWidth, subTitleWidth]) + 2 * padding,
      [titleWidth, subTitleWidth],
    );
    const topOffset =
      children.length === 2 ? particle.children[0].radius : particle.radius;
    // title coordinate
    const titleX = particle.xCoords;
    const titleY =
      particle.yCoords - topOffset - distance - offset - (3 * height) / 4 + 5; // 3 is hardcode to set center text
    const titleDX = -titleWidth / 2;

    // sub title coordinate
    const subTitleX = particle.xCoords;
    const subTitleY =
      particle.yCoords - topOffset - distance - offset - height / 4 + 3; // 3 is hardcode to set center text
    const subTitleDX = -subTitleWidth / 2;

    const handleShowTip = () => setTipShow((val) => !val);

    useEffect(() => {
      if (refTextTitle.current) {
        setTitleWidth(refTextTitle.current.getComputedTextLength());
      }
      if (refTextSubTitle.current) {
        setSubTitleWidth(refTextSubTitle.current.getComputedTextLength());
      }
    }, [particle.title, particle.subTitle]);

    const drawPath = topTooltipPath(
      width,
      height,
      offset,
      boxRadius,
      particle.xCoords,
      particle.yCoords - topOffset - distance,
    );

    return (
      <g key={particle.id}>
        <>
          <path
            d={drawPath}
            style={{
              fill: TooltipBackgroundColor,
              stroke: TooltipBackgroundColor,
              visibility: isTipShow ? 'visible' : 'hidden',
            }}
          />
          <text
            ref={refTextTitle}
            x={titleX}
            y={titleY}
            dx={titleDX}
            style={{
              fontSize: 12,
              paddingTop: 4,
              fontWeight: '600',
              fontFamily: 'var(--font-family)',
              color: 'var(--text-tooltip-header-neutral-default)',
              visibility: isTipShow ? 'visible' : 'hidden',
            }}
          >
            {particle.title}
          </text>
          <text
            ref={refTextSubTitle}
            x={subTitleX}
            y={subTitleY}
            dx={subTitleDX}
            style={{
              fontSize: 12,
              fontWeight: '400',
              fontFamily: 'var(--font-family)',
              color: 'var(--text-tooltip-body-neutral-default)',
              visibility: isTipShow ? 'visible' : 'hidden',
            }}
          >
            {particle.subTitle?.slice(0, 18)}
          </text>
        </>
        {childrenToRender.length > 1 && (
          <path
            d={drawPathForRound(particle)}
            stroke={OuterRightColor}
            strokeWidth="2"
            fill={OuterRightColor}
            onClick={handleShowTip}
          />
        )}
        {childrenToRender.map((child) => {
          const { xCoords, yCoords, radius, background, id } = child;
          return (
            <g
              key={id}
              onClick={() =>
                onMemberPressed && onMemberPressed(child, particle)
              }
            >
              {isTipShow && (
                <circle
                  cx={xCoords}
                  cy={yCoords}
                  r={radius + 2}
                  strokeWidth="5"
                  stroke={SelectOuterRingColor}
                  fill="none"
                />
              )}
              <circle
                cx={xCoords}
                cy={yCoords}
                r={radius}
                strokeWidth="6"
                stroke={OuterRightColor}
                fill="none"
              />
              <defs>
                <clipPath id={id}>
                  <circle cx={xCoords} cy={yCoords} r={radius} />
                </clipPath>
              </defs>
              {background ? (
                <image
                  x={xCoords - radius}
                  y={yCoords - radius}
                  width={radius * 2}
                  height={radius * 2}
                  clipRule="nonzero"
                  clipPath={`url(#${id})`}
                  preserveAspectRatio="xMidYMid slice"
                  href={background}
                  onMouseEnter={handleShowTip}
                  onMouseLeave={handleShowTip}
                />
              ) : (
                <image
                  x={xCoords - radius}
                  y={yCoords - radius}
                  width={radius * 2}
                  height={radius * 2}
                  clipRule="nonzero"
                  clipPath={`url(#${id})`}
                  preserveAspectRatio="xMidYMid slice"
                  href={avatar_m}
                  onMouseEnter={handleShowTip}
                  onMouseLeave={handleShowTip}
                />
              )}
            </g>
          );
        })}
        {moreChildren > 0 && (
          <g
            onClick={() =>
              onMemberPressed && onMemberPressed(lastChild, particle)
            }
          >
            <circle
              cx={lastChild.xCoords}
              cy={lastChild.yCoords}
              r={lastChild.radius}
              strokeWidth="6"
              fill={MoreBackgroundColor}
              opacity="0.8"
            />
            <text
              x={lastChild.xCoords - 5}
              y={lastChild.yCoords}
              stroke="var(--text-avatar-neutral-alt-default)"
              strokeWidth="1px"
              alignmentBaseline="middle"
              fontSize="12px"
            >
              {`+ ${moreChildren}`}
            </text>
          </g>
        )}
      </g>
    );
  },
);
