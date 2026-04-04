"use client";

import { useRef, CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles in your global CSS or _app.tsx:
// import "swiper/css";
// import "swiper/css/pagination";

interface TestimonialItem {
  name: string;
  designation: string;
  text: string;
  avatar: string;
  stars: number;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Maria Doe",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_1.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
  {
    name: "Andrew Simon",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_2.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
  {
    name: "Alex Jordan",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_1.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
  {
    name: "Maria Doe",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_2.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
  {
    name: "Angelina Rose",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_1.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
  {
    name: "Maria Doe",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_1.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
  {
    name: "Andrew Simon",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_2.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
  {
    name: "Alex Jordan",
    designation: "Traveller",
    avatar: "assets/Theme3/testimonials/testi_1_1.jpg",
    stars: 5,
    text: '"A home that perfectly blends sustainability with luxury until I discovered Ecoland Residence. From the moment I stepped into this community, I knew it was where I wanted to live. The commitment to eco-friendly living"',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="tc-review">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#FFA944"
          style={{ marginRight: 3, display: "inline-block" }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestiCard({ item }: { item: TestimonialItem }) {
  const cardStyle: CSSProperties = {
    position: "relative",
    padding: "40px 40px 64px",
    background: "rgba(13, 165, 255, 0.12)",
    borderRadius: "24px",
    margin: "10px 10px",
  };

  const wrapperStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "8px",
  };

  const profileStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "16px",
  };

  const avatarStyle: CSSProperties = {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  };

  const nameStyle: CSSProperties = {
    fontSize: "24px",
    fontWeight: 700,
    color: "#0D0D0C",
    margin: 0,
    lineHeight: 1.2,
  };

  const desigStyle: CSSProperties = {
    fontSize: "14px",
    color: "#6E7070",
    display: "block",
    marginTop: "4px",
  };

  const textStyle: CSSProperties = {
    color: "#0D0D0C",
    fontSize: "20px",
    fontWeight: 500,
    marginBottom: 0,
    lineHeight: 1.6,
  };

  const quoteStyle: CSSProperties = {
    width: "78px",
    height: "78px",
    lineHeight: "70px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    border: "4px solid #ffffff",
    borderRadius: "50%",
    position: "absolute",
    left: "48%",
    bottom: "-30px",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={cardStyle}>
      <div style={wrapperStyle}>
        <div style={profileStyle}>
          <img src={item.avatar} alt={item.name} style={avatarStyle} />
          <div>
            <h3 style={nameStyle}>{item.name}</h3>
            <span style={desigStyle}>{item.designation}</span>
          </div>
        </div>
        <StarRating count={item.stars} />
      </div>

      <p style={textStyle}>{item.text}</p>

      {/* Quote icon — inline SVG instead of external image */}
      <div style={quoteStyle}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#1CA8CB">
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
      </div>
    </div>
  );
}

export default function TestimonialArea() {
  const swiperRef = useRef<SwiperType | null>(null);

  const sectionStyle: CSSProperties = {
    position: "relative",
    overflow: "visible",
    padding: "80px 0",
  };

  const titleAreaStyle: CSSProperties = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const subTitleStyle: CSSProperties = {
    display: "block",
    color: "#113D48",
    fontSize: "40px",
    lineHeight: "40px",
    fontWeight: 400,
    fontFamily: "'Montez', cursive",
    marginBottom: "4px",
  };

  const secTitleStyle: CSSProperties = {
    fontSize: "clamp(28px, 4vw, 48px)",
    fontWeight: 700,
    color: "#113D48",
    margin: "0 0 8px",
    lineHeight: 1.2,
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .tc-swiper {
              padding-top: 40px !important;
              overflow: visible !important;
            }
            .tc-swiper .swiper-slide {
              padding-bottom: 60px;
              transition: transform 0.4s ease;
            }
            .tc-swiper .swiper-slide-active {
              transform: translateY(-20px);
            }
            .tc-swiper .swiper-pagination {
              position: relative !important;
              bottom: unset !important;
              margin-top: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 6px;
            }
            .tc-swiper .swiper-pagination-bullet {
              background: #1CA8CB;
              opacity: 0.4;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              display: inline-block;
              transition: all 0.3s ease;
              margin: 0 !important;
              flex-shrink: 0;
            }
            .tc-swiper .swiper-pagination-bullet-active {
              opacity: 1;
              width: 28px;
              border-radius: 5px;
            }
            @media (max-width: 575px) {
              .tc-testi-text {
                font-size: 18px !important;
              }
              .tc-testi-name {
                font-size: 20px !important;
              }
              .tc-testi-card {
                padding: 25px 25px 64px !important;
              }
            }
          `,
        }}
      />

      <section style={sectionStyle} id="testi-sec">
        <div style={{ overflow: "hidden" }}>
        <div style={{ padding: "0" }}>

          {/* Title */}
          <div style={titleAreaStyle}>
            <span style={subTitleStyle}>Testimonial</span>
            <h2 style={secTitleStyle}>What Client Say About us</h2>
          </div>

          {/* Swiper Slider */}
          <div style={{ marginTop: "20px" }}>
            <Swiper
              className="tc-swiper"
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              centeredSlides={true}
              loop={true}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              breakpoints={{
                0:    { slidesPerView: 1 },
                767:  { slidesPerView: 2, centeredSlides: true },
                992:  { slidesPerView: 2, centeredSlides: true },
                1200: { slidesPerView: 2.5, centeredSlides: true },
                1400: { slidesPerView: 2.5, centeredSlides: true },
              }}
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <TestiCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        </div>
        {/* Shape mockups — hidden until images are available */}
        <div
          style={{ position: "absolute", bottom: "-2%", right: "0%", display: "none" }}
          aria-hidden="true"
        >
          <img src="assets/img/shape/line2.png" alt="shape" />
        </div>
        <div
          style={{ position: "absolute", top: "30%", left: "5%", display: "none" }}
          aria-hidden="true"
        >
          <img src="assets/img/shape/shape_7.png" alt="shape" />
        </div>
      </section>
    </>
  );
}