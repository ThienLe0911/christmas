import { useRef, useEffect, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./PhotoBook.css";

// Import images
import img1 from "../assets/images/1.JPG";
import img2 from "../assets/images/IMG_5725.jpg";
import img3 from "../assets/images/IMG_6454.jpg";
import img4 from "../assets/images/IMG_8048.jpg";
import img5 from "../assets/images/IMG_8054.jpg";
import img6 from "../assets/images/IMG_8207.jpg";
import img7 from "../assets/images/IMG_8552.jpg";
import img8 from "../assets/images/thaocamvien.PNG";
import img9 from "../assets/images/vanluontuoisang.jpg";

// Component cho mỗi trang sách
const Page = forwardRef(({ pageNumber, image, text }, ref) => {
  return (
    <div className="page-wrapper" ref={ref}>
      <div className="page-content">
        <img
          src={image}
          alt={`Page ${pageNumber}`}
          className="page-image"
          loading="eager"
        />
        <p className="page-text">{text}</p>
        <div className="page-number">{pageNumber}</div>
      </div>
    </div>
  );
});

Page.displayName = "Page";

function PhotoBook() {
  const book = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [bookSize, setBookSize] = useState({
    width: 550,
    height: Math.max(750, window.innerHeight * 0.7)
  });

  // Cập nhật kích thước khi resize
  useEffect(() => {
    const handleResize = () => {
      setBookSize({
        width: 550,
        height: Math.max(750, window.innerHeight * 0.7)
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dữ liệu cho các trang sách với hình ảnh thật
  const pages = [
    {
      image: img1,
      text: "Khoảnh khắc đầu tiên chúng ta gặp nhau...",
    },
    {
      image: img2,
      text: "Những ngày bên nhau luôn tràn ngập niềm vui",
    },
    {
      image: img3,
      text: "Em luôn làm anh mở miệng cười",
    },
    {
      image: img4,
      text: "Mỗi khoảnh khắc bên em",
    },
    {
      image: img7,
      text: "Mỗi ngày bên em là một món quà",
    },
    {
      image: img8,
      text: "Kỷ niệm đẹp của chúng mình",
    },
    {
      image: img5,
      text: "Cảm ơn em đã luôn ở bên anh",
    },
    {
      image: img6,
      text: "Anh yêu em rất nhiều! ❤️",
    },
    {
      image: img9,
      text: "Mãi bên nhau em nhé!",
    },
  ];

  // Preload tất cả hình ảnh
  useEffect(() => {
    const imagePromises = pages.map((page) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = page.image;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((err) => {
        console.error("Error loading images:", err);
        setImagesLoaded(true); // Vẫn tiếp tục hiển thị
      });
  }, []);

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  const nextPage = () => {
    book.current?.pageFlip()?.flipNext();
  };

  const prevPage = () => {
    book.current?.pageFlip()?.flipPrev();
  };

  if (!imagesLoaded) {
    return (
      <div className="photobook-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Đang chuẩn bị quà tặng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="photobook-container">
      <div className="flipbook-wrapper">
        <HTMLFlipBook
          ref={book}
          width={bookSize.width}
          height={bookSize.height}
          size="stretch"
          minWidth={400}
          maxWidth={1200}
          minHeight={500}
          maxHeight={2000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="flipbook"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={50}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((page, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              image={page.image}
              text={page.text}
            />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="controls">
        <button
          className="nav-button prev"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          ← Trang trước
        </button>
        <span className="page-indicator">
          Trang {currentPage + 1} / {pages.length}
        </span>
        <button
          className="nav-button next"
          onClick={nextPage}
          disabled={currentPage >= pages.length - 1}
        >
          Trang sau →
        </button>
      </div>
    </div>
  );
}

export default PhotoBook;
