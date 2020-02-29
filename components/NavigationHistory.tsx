import React, { Fragment, useState, useEffect } from "react";
import * as colors from "../utils/colors";
import Link from "next/link";
import { Topic, Category } from "../utils/types";
import Media from "react-media";

interface NavigationHistoryProps {
  category?: Category;
  topic?: Topic;
}

interface Point {
  x: number;
  y: number;
}

export default function NavigationHistory({
  category,
  topic
}: NavigationHistoryProps) {
  const [connection, setConnection] = useState<{
    from: Point;
    to: Point;
  } | null>(null);

  const updateConnection = () => {
    const topicBounds = document
      .getElementById("topic-circle")
      ?.getBoundingClientRect();
    const categoryBounds = document
      .getElementById("category-circle")
      ?.getBoundingClientRect();
    const containerBounds = document
      .getElementById("navigation-container")
      ?.getBoundingClientRect();
    if (!topicBounds || !categoryBounds || !containerBounds) return;
    const fromLeft = categoryBounds.left - containerBounds.left;
    const fromTop = categoryBounds.top - containerBounds.top;
    const toLeft = topicBounds.left - containerBounds.left;
    const toRight = topicBounds.top - containerBounds.top;
    setConnection({
      from: { x: fromLeft, y: fromTop },
      to: { x: toLeft, y: toRight }
    });
  };

  useEffect(() => {
    updateConnection();
    window.addEventListener("resize", updateConnection);
    return () => window.removeEventListener("resize", updateConnection);
  }, []);

  if (!category) return null;

  return (
    <div className="container" id="navigation-container">
      <Media queries={{ small: "(max-width: 1350px)" }}>
        {matches => {
          console.log(matches.small);
          return !matches.small ? (
            <Fragment>
              <Link href={`/categories/${category.id}`}>
                <a className="row" style={{ marginBottom: 20 }}>
                  <Circle id="category-circle" fill={!topic} />
                  <span className="text">{category.name}</span>
                </a>
              </Link>
              {topic && (
                <Fragment>
                  <Link href={`/topic/${topic.id}`}>
                    <a className="row">
                      <Circle fill id="topic-circle" />
                      <span className="text">{topic.name}</span>
                    </a>
                  </Link>
                  {connection && (
                    <svg
                      className="connection"
                      width={10}
                      height={connection.to.y - connection.from.y}
                    >
                      <line
                        x1={connection.from.x + 1}
                        y1={connection.from.y}
                        x2={connection.to.x + 1}
                        y2={connection.to.y}
                        strokeWidth={2}
                        stroke={colors.PRIMARY_BLUE}
                      />
                    </svg>
                  )}
                </Fragment>
              )}
            </Fragment>
          ) : (
            <div className="path-container">
              <Link href={`/categories/${category.id}`}>
                <a style={{ color: topic ? colors.GRAY : colors.PRIMARY_BLUE }}>
                  {category.name}
                </a>
              </Link>
              {topic && (
                <Fragment>
                  <span className="dash">/</span>
                  <Link href={`/topic/${topic.id}`}>
                    <a style={{ color: colors.PRIMARY_BLUE }}>{topic.name}</a>
                  </Link>
                </Fragment>
              )}
            </div>
          );
        }}
      </Media>

      <style jsx>{`
        .container {
          position: absolute;
          left: 50px;
        }
        .text {
          max-width: calc(calc(100vw - ${800 + (10 + 20 + 50 + 20) * 2}px) / 2);
          word-wrap: break-word;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 16px;
          color: ${colors.PRIMARY_BLUE};
          padding-left: 10px;
        }
        .row {
          display: flex;
          align-items: center;
        }
        .connection {
          z-index: -1;
          position: absolute;
          left: 9px;
          top: 10px;
        }
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .path-container {
          max-width: 800px;
          width: calc(100vw - 50px);
        }
        .path-container > a {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 16px;
          color: ${colors.GRAY};
        }
        .dash {
          font-size: 16px;
          color: ${colors.GRAY};
          padding: 0 8px;
        }
        @media screen and (max-width: 1350px) {
          .container {
            margin: 20px 0;
            position: relative;
            left: 0;
            display: flex;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

const Circle = ({ fill, id }: { fill?: boolean; id?: string }) => (
  <svg width={20} height={20} id={id}>
    <circle
      cx={10}
      cy={10}
      r={9}
      strokeWidth={2}
      stroke={colors.PRIMARY_BLUE}
      fill={fill ? colors.PRIMARY_BLUE : colors.WHITE}
    ></circle>
  </svg>
);
