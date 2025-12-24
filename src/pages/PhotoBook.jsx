import { useRef, useEffect, useState, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './PhotoBook.css';

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

Page.displayName = 'Page';

function PhotoBook() {
  const book = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Dữ liệu demo cho các trang sách
  const pages = [
    {
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
      text: 'Khoảnh khắc đầu tiên chúng ta gặp nhau...'
    },
    {
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
      text: 'Những ngày bên nhau thật tuyệt vời'
    },
    {
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
      text: 'Em luôn làm anh mở miệng cười'
    },
    {
      image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&q=80',
      text: 'Mỗi khoảnh khắc bên em đều là quý giá'
    },
    {
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      text: 'Cảm ơn em đã luôn ở bên anh'
    },
    {
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
      text: 'Anh yêu em rất nhiều! ❤️'
    }
  ];

  // Preload tất cả hình ảnh
  useEffect(() => {
    const imagePromises = pages.map(page => {
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
      .catch(err => {
        console.error('Error loading images:', err);
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
          width={450}
          height={600}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
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
