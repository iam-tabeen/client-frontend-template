"use client";

import React from "react";

// ─── Inline styles mirroring the original CSS variables & rules ───────────────
const CSS_VARS = {
  themeColor: "#1CA8CB",
  primaryColor: "#1CA8CB",
  titleColor: "#113D48",
  bodyColor: "#6E7070",
  smokeColor: "#E9F6F9",
  whiteColor: "#ffffff",
  yellowColor: "#FFB539",
  titleFont: "'Manrope', sans-serif",
  bodyFont: "'Inter', sans-serif",
  styleFont: "'Montez', cursive",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface AboutItem {
  iconSrc: string;
  iconAlt: string;
  title: string;
  text: string;
}

interface AboutSectionProps {
  /** The three layered images for img-box1 */
  img1Src?: string;
  img2Src?: string;
  img3Src?: string;
  /** Subtitle (Montez font) */
  subTitle?: string;
  /** Main heading */
  secTitle?: string;
  /** Body paragraph */
  secText?: string;
  /** Feature items (up to 2 shown by default) */
  aboutItems?: AboutItem[];
  /** CTA link */
  ctaHref?: string;
  ctaLabel?: string;
}

const defaultAboutItems: AboutItem[] = [
  {
    iconSrc: "assets/images/shapes/map3.svg",
    iconAlt: "",
    title: "Exclusive Trip",
    text: "There are many variations of passages of available but the majority.",
  },
  {
    iconSrc: "assets/images/shapes/guide.svg",
    iconAlt: "",
    title: "Professional Guide",
    text: "There are many variations of passages of available but the majority.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const AboutSection: React.FC<AboutSectionProps> = ({
 
  subTitle = "Let's Go Together",
  secTitle = "Plan Your Trip With us",
  secText =
    "There are many variations of passages of available but the majority have suffered alteration in some form, by injected hum randomised words which don't look even slightly.",
  aboutItems = defaultAboutItems,
  ctaHref = "about.html",
  ctaLabel = "Learn More",
}) => {
  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Manrope:wght@200..800&family=Montez&display=swap');

        /* ── CSS variables ── */
        :root {
          --theme-color: ${CSS_VARS.themeColor};
          --primary-color: ${CSS_VARS.primaryColor};
          --title-color: ${CSS_VARS.titleColor};
          --body-color: ${CSS_VARS.bodyColor};
          --smoke-color: ${CSS_VARS.smokeColor};
          --white-color: ${CSS_VARS.whiteColor};
          --yellow-color: ${CSS_VARS.yellowColor};
          --title-font: ${CSS_VARS.titleFont};
          --body-font: ${CSS_VARS.bodyFont};
          --style-font: ${CSS_VARS.styleFont};
          --section-space: 120px;
          --section-space-mobile: 80px;
          --section-title-space: 60px;
        }

        /* ── Reset / base ── */
        *, *::before, *::after { box-sizing: border-box; }

        .about-section-root {
          font-family: var(--body-font);
          font-size: 16px;
          font-weight: 400;
          color: var(--body-color);
          line-height: 26px;
          -webkit-font-smoothing: antialiased;
        }

        /* ── .about-area ── */
        .about-area {
          position: relative;
          overflow: hidden;
          padding-top: var(--section-space);
          padding-bottom: var(--section-space);
        }
        @media (max-width: 991px) {
          .about-area {
            padding-top: var(--section-space-mobile);
            padding-bottom: var(--section-space-mobile);
          }
        }

        /* ── Bootstrap-like container / grid ── */
        .container {
          width: 100%;
          max-width: 1320px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 12px;
          padding-right: 12px;
          position: relative;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          margin-left: -12px;
          margin-right: -12px;
        }
        .col-xl-6 {
          width: 100%;
          padding-left: 12px;
          padding-right: 12px;
        }
        @media (min-width: 1200px) {
          .col-xl-6 { width: 50%; }
          .ps-xl-4  { padding-left: 1.5rem !important; }
          .ms-xl-2  { margin-left: 0.5rem !important; }
          .pe-xl-5  { padding-right: 3rem !important; }
          .me-xl-5  { margin-right: 3rem !important; }
        }

        /* ── img-box1 ── */
        .img-box1 {
          position: relative;
          margin-bottom: 20px;
        }
        @media (max-width: 1199px) {
          .img-box1 { margin-bottom: 50px; }
        }

        /* img1 */
        .img-box1 .img1 {
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 1299px) {
          .img-box1 .img1 { max-width: 280px; }
        }
        @media (max-width: 480px) {
          .img-box1 .img1 { max-width: 100%; }
        }
        .img-box1 .img1 img {
          border-radius: 156px 156px 0px 156px;
          max-width: 100%;
          height: auto;
        }

        /* img2 */
        .img-box1 .img2 {
          position: absolute;
          top: 0;
          right: 0;
          overflow: hidden;
        }
        @media (max-width: 1399px) { .img-box1 .img2 { max-width: 280px; } }
        @media (max-width: 1299px) { .img-box1 .img2 { max-width: 220px; } }
        @media (max-width: 1199px) { .img-box1 .img2 { right: 40%; } }
        @media (max-width: 991px)  { .img-box1 .img2 { right: 20%; } }
        @media (max-width: 767px)  { .img-box1 .img2 { right: 0%; } }
        @media (max-width: 480px)  { .img-box1 .img2 { display: none; } }
        .img-box1 .img2 img {
          border-radius: 156px 156px 156px 0px;
          max-width: 100%;
          height: auto;
        }

        /* img3 */
        .img-box1 .img3 {
          position: absolute;
          bottom: -20px;
          right: 0;
          overflow: hidden;
        }
        @media (max-width: 1399px) { .img-box1 .img3 { max-width: 280px; } }
        @media (max-width: 1299px) { .img-box1 .img3 { max-width: 220px; } }
        @media (max-width: 1199px) { .img-box1 .img3 { right: 40%; } }
        @media (max-width: 991px)  { .img-box1 .img3 { right: 20%; } }
        @media (max-width: 767px)  { .img-box1 .img3 { right: 0%; } }
        @media (max-width: 480px)  { .img-box1 .img3 { display: none; } }
        .img-box1 .img3 img {
          border-radius: 156px 0px 156px 156px;
          max-width: 100%;
          height: auto;
        }

        /* ── sub-title (.style1 inherits base, Montez font) ── */
        .sub-title {
          display: block;
          color: var(--theme-accent);
          font-size: 40px;
          line-height: 40px;
          font-weight: 400;
          font-family: var(--style-font);
          position: relative;
          margin-bottom: -4px;
        }
        @media (max-width: 480px) { .sub-title { font-size: 30px; line-height: 30px; } }
        @media (max-width: 375px) { .sub-title { font-size: 25px; line-height: 25px; } }

        /* ── sec-title ── */
        .sec-title {
          font-family: var(--title-font);
          font-size: 48px;
          line-height: 1.208;
          font-weight: 700;
          color: var(--theme-primary);
          margin-top: 0;
          margin-bottom: calc(var(--section-title-space) - 11px);
        }
        @media (max-width: 1199px) { .sec-title { font-size: 40px; } }
        @media (max-width: 991px)  { .sec-title { font-size: 36px; } }
        @media (max-width: 767px)  { .sec-title { font-size: 30px; } }

        /* ── title-area ── */
        .title-area {
          margin-bottom: calc(var(--section-title-space) - 11px);
          position: relative;
          z-index: 2;
        }
        .title-area .sec-title { margin-bottom: 22px; }

        /* ── sec-text ── */
        .sec-text {
          font-size: 18px;
          line-height: 26px;
          color: var(--body-color);
        }

        /* ── about-item-wrap ── */
        .about-item-wrap { display: flex; flex-direction: column; }

        /* ── about-item ── */
        .about-item {
          display: flex;
          gap: 16px;
          max-width: 400px;
        }
        .about-item:not(:last-child) { margin-bottom: 30px; }

        .about-item_img {
          min-width: 72px;
          height: 72px;
          line-height: 72px;
          border-radius: 50%;
          text-align: center;
          background-color: var(--theme-primary);
          transition: all 0.4s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .about-item_img img { transition: all 0.4s ease-in-out; }
        .about-item_img:hover { background-color: var(--title-color); }
        .about-item_img:hover img { transform: rotateY(180deg); }

        .about-item_centent { display: flex; flex-direction: column; justify-content: center; }

        .box-title {
          font-size: 24px;
          line-height: 1.417;
          font-weight: 600;
          margin-top: -0.32em;
          margin-bottom: 7px;
          color: #414141;
          font-family: var(--title-font);
        }
        @media (max-width: 375px) { .box-title { font-size: 20px; } }

        .about-item_text {
          margin-bottom: -0.3rem;
          color: var(--body-color);
          line-height: 26px;
          font-size: 16px;
        }

        /* ── th-btn style3 th-icon ── */
        .th-btn {
          position: relative;
          z-index: 2;
          overflow: hidden;
          vertical-align: middle;
          text-align: center;
          background-color: var(--theme-color);
          color: var(--white-color);
          font-family: var(--body-font);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-transform: capitalize;
          border: none;
          font-size: 16px;
          font-weight: 400;
          padding: 18.8px 35px;
          border-radius: 48px;
          transition: all 0.3s 0s ease-out;
          gap: 8px;
          text-decoration: none;
          cursor: pointer;
        }
        .th-btn::before {
          content: '';
          width: 0;
          height: 100%;
          border-radius: 30em;
          position: absolute;
          top: 0;
          left: -5%;
          background-color: var(--title-color);
          transition: .5s ease;
          display: block;
          z-index: -1;
        }
        .th-btn:hover { color: var(--white-color); box-shadow: none; }
        .th-btn:hover::before { width: 110%; }

        /* style3: bg = title-color, hover bg = theme-color */
        .th-btn.style3 {
          background-color: #202020;
          color: var(--white-color);
          box-shadow: none;
          border: none;
        }
        .th-btn.style3::before { background-color: var(--theme-primary); }

        

        /* th-icon arrow after pseudo */
        .th-btn.th-icon::after {
          content: '';
          position: relative;
          background-color: var(--white-color);
          width: 24px;
          height: 24px;
          display: block;
          transition: 0.4s;
          /* Arrow shape via clip-path since mask-image needs asset */
          clip-path: polygon(0 35%, 60% 35%, 60% 10%, 100% 50%, 60% 90%, 60% 65%, 0 65%);
        }

        /* ── shape-mockup base ── */
        .shape-mockup {
          position: absolute;
          z-index: -1;
          pointer-events: none;
        }

        /* ── about-shape ── */
        .about-shape {
          position: absolute;
        }
        .about-shape::before {
          content: "";
          position: absolute;
          left: -47%;
          bottom: 17%;
          width: 396px;
          height: 396px;
          border-radius: 50%;
          background: #E9F6F9;
          z-index: -1;
        }

        /* ── about-rating ── */
        .about-rating {
          width: 62px;
          height: 62px;
          line-height: 62px;
          border-radius: 50%;
          background-color: var(--white-color);
          box-shadow: 0px 20px 20px rgba(204,204,204,0.25);
          text-align: center;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .about-rating i {
          font-size: 16px;
          color: #EB5757;
          display: block;
        }
        .about-rating span {
          display: block;
          font-weight: 700;
          font-size: 16px;
          line-height: 28px;
          color: #000000;
        }

        /* ── about-emoji ── */
        .about-emoji {
          width: 62px;
          height: 62px;
          line-height: 62px;
          border-radius: 50%;
          background-color: var(--white-color);
          box-shadow: 0px 20px 20px rgba(204,204,204,0.25);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── movingX animation ── */
        @keyframes movingX {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(20px); }
          100% { transform: translateX(0); }
        }
        .movingX { animation: movingX 4s linear infinite; }

        /* ── utility spacing ── */
        .mb-20 { margin-bottom: 20px !important; }
        .mb-30 { margin-bottom: 30px !important; }
        .mt-35 { margin-top: 35px !important; }

        /* d-none d-xl-block / d-xxl-block helpers */
        .d-none { display: none !important; }
        @media (min-width: 1200px) { .d-xl-block { display: block !important; } }
        @media (min-width: 1400px) { .d-xxl-block { display: block !important; } }
      `}</style>

      {/* ── About Area ── */}
      <div className="about-section-root">
        <div className="about-area" id="about-sec">
          <div className="container">
            <div className="row">

              {/* ── Left: layered image box ── */}
              <div className="col-xl-6">
                <div className="img-box1">
                  <div className="img1 ">
                    <img src="/assets/Theme3/about_1_1.jpg" alt="About" />
                  </div>
                  <div className="img2">
                    <img src="/assets/Theme3/about_1_2.jpg" alt="About" />
                  </div>
                  <div className="img3">
                    <img src="/assets/Theme3/about_1_3.jpg" alt="About" />
                  </div>
                </div>
              </div>

              {/* ── Right: text content ── */}
              <div className="col-xl-6">
                <div className="ps-xl-4 ms-xl-2">

                  {/* Title area */}
                  <div className="title-area mb-20 pe-xl-5 me-xl-5">
                    <span className="sub-title style1">{subTitle}</span>
                    <h2 className="sec-title mb-20 pe-xl-5 me-xl-5">{secTitle}</h2>
                    <p className="sec-text mb-30">{secText}</p>
                  </div>

                  {/* Feature items */}
                  <div className="about-item-wrap">
                    {aboutItems.map((item, index) => (
                      <div className="about-item" key={index}>
                        <div className="about-item_img">
                          <img src={item.iconSrc} alt={item.iconAlt} />
                        </div>
                        <div className="about-item_centent">
                          <h5 className="box-title">{item.title}</h5>
                          <p className="about-item_text">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div className="mt-35">
                    <a href={ctaHref} className="th-btn style3 ">
                      {ctaLabel}
                    </a>
                  </div>

                </div>
              </div>
            </div>

            {/* ── Decorative shapes (desktop only) ── */}
            <div
              className="shape-mockup shape1 d-none d-xl-block"
              style={{ top: "12%", left: "-16%" }}
            >
              <img src="assets/img/shape/shape_1.png" alt="shape" />
            </div>
            <div
              className="shape-mockup shape2 d-none d-xl-block"
              style={{ top: "20%", left: "-16%" }}
            >
              <img src="assets/img/shape/shape_2.png" alt="shape" />
            </div>
            <div
              className="shape-mockup shape3 d-none d-xl-block"
              style={{ top: "14%", left: "-10%" }}
            >
              <img src="assets/img/shape/shape_3.png" alt="shape" />
            </div>

            {/* ── Floating slide image (xxl only) ── */}
            <div
              className="shape-mockup about-shape movingX d-none d-xxl-block"
              style={{ bottom: "0%", right: "-11%" }}
            >
              <img src="assets/img/normal/about-slide-img.png" alt="shape" />
            </div>

            {/* ── Rating badge (xxl only) ── */}
            <div
              className="shape-mockup about-rating d-none d-xxl-block"
              style={{ bottom: "50%", right: "-20%" }}
            >
              <i className="fa-sharp fa-solid fa-star" />
              <span>4.9k</span>
            </div>

            {/* ── Emoji badge (xxl only) ── */}
            <div
              className="shape-mockup about-emoji d-none d-xxl-block"
              style={{ bottom: "25%", right: "5%" }}
            >
              <img src="assets/img/icon/emoji.png" alt="" />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;