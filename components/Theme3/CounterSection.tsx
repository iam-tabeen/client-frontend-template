"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";

interface CounterItem {
  value: number;
  suffix?: string;
  title: string;
}

const counters: CounterItem[] = [
  { value: 12, title: "Years Experience" },
  { value: 97, suffix: "%", title: "Retention Rate" },
  { value: 8, suffix: "k", title: "Tour Completed" },
  { value: 19, suffix: "k", title: "Happy Travellers" },
];

function useCountUp(target: number, duration = 2000, start = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return count;
}

interface CounterCardProps {
  item: CounterItem;
  index: number;
  animate: boolean;
}

function CounterCard({ item, index, animate }: CounterCardProps) {
  const count = useCountUp(item.value, 2000, animate);
  const isEven = index % 2 === 1;
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: CSSProperties = {
    position: "relative",
    backgroundColor: "#0da5ff2e",
    width: "264px",
    height: "264px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: isEven ? "0px" : "80px",
    textAlign: "center",
    borderRadius: "50%",
    zIndex: 2,
    cursor: "default",
    flexShrink: 0,
  };

  const ringStyle: CSSProperties = {
    position: "absolute",
    top: "-24px",
    left: "-24px",
    right: "-24px",
    bottom: "-24px",
    width: "312px",
    height: "312px",
    borderRadius: "50%",
    border: "1px solid #0da5ffb5",
    transition: "all 0.4s ease-in-out",
    pointerEvents: "none",
    animation: isHovered ? "ccSpin 10s linear infinite" : "none",
  };

  const dotStyle: CSSProperties = {
    position: "absolute",
    top: isEven ? "24px" : "auto",
    bottom: isEven ? "auto" : "55px",
    right: isEven ? "43px" : "15px",
    width: "24px",
    height: "24px",
    display: "block",
    borderRadius: "50%",
    backgroundColor: "#0da5ff21",
    zIndex: 2,
  };

  const dot2Style: CSSProperties = {
    position: "absolute",
    bottom: isEven ? "auto" : "20%",
    top: isEven ? "10%" : "auto",
    right: isEven ? "16%" : "7%",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#0da5ff9e",
    display: "block",
  };

  const numberStyle: CSSProperties = {
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "1",
    color: "#0D0D0C",
    margin: "0 0 7px 0",
    display: "block",
  };

  const titleStyle: CSSProperties = {
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "1.5",
    color: "#0D0D0C",
    margin: 0,
    display: "block",
  };

  return (
    <div className="counter-wrap">
      <div
        className="counter-card-inner"
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={ringStyle}>
          <span style={dotStyle} />
          <span style={dot2Style} />
        </div>

        <div>
          <h3 style={numberStyle}>
            {count}
            {item.suffix ?? ""}
          </h3>
          <h6 style={titleStyle}>{item.title}</h6>
        </div>
      </div>
    </div>
  );
}

export default function CounterArea() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sectionStyle: CSSProperties = {
    padding: "80px 0",
    position: "relative",
    overflow: "visible",
  };

  const containerStyle: CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px",
    position: "relative",
  };

  const rowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    overflow: "visible",
    padding: "40px 0 60px",
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ccSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            .counter-row {
              display: flex;
              flex-wrap: nowrap;
              justify-content: center;
              align-items: flex-start;
              gap: 20px;
              overflow: visible;
              padding: 40px 0 60px;
            }
            .counter-wrap {
              display: flex;
              justify-content: center;
              width: 312px;
              flex-shrink: 0;
              overflow: visible;
            }
            @media (max-width: 1199px) {
              .counter-row {
                flex-wrap: wrap;
                gap: 60px 30px;
                padding: 20px 0 40px;
              }
              .counter-card-inner {
                margin-top: 0 !important;
              }
            }
            @media (max-width: 575px) {
              .counter-row {
                gap: 80px 20px;
                padding: 10px 0 30px;
              }
              .counter-wrap {
                width: 280px;
              }
            }
          `,
        }}
      />
      <div style={sectionStyle} ref={sectionRef}>
        <div style={containerStyle}>
          <div className="counter-row">
            {counters.map((item, index) => (
              <CounterCard key={index} item={item} index={index} animate={animate} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}