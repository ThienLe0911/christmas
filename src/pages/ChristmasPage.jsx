import { useNavigate } from 'react-router-dom';
import './ChristmasPage.css';

function ChristmasPage() {
  const navigate = useNavigate();

  const handleGiftClick = () => {
    navigate('/photobook');
  };

  return (
    <div className="christmas-container">
      <div className="snow-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="snowflake" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 7}s`
          }}>❅</div>
        ))}
      </div>

      <h1 className="christmas-title">🎄 Merry Christmas My Love 🎄</h1>
      
      <div className="scene">
        {/* Cây thông Noel */}
        <div className="christmas-tree">
          <div className="tree-top">⭐</div>
          <div className="tree-layer tree-layer-1">🎄</div>
          <div className="tree-layer tree-layer-2">🎄</div>
          <div className="tree-layer tree-layer-3">🎄</div>
          <div className="tree-trunk"></div>
          <div className="decorations">
            <span className="ornament ornament-1">🔴</span>
            <span className="ornament ornament-2">🟡</span>
            <span className="ornament ornament-3">🔵</span>
            <span className="ornament ornament-4">🟢</span>
            <span className="ornament ornament-5">🔴</span>
            <span className="ornament ornament-6">🟡</span>
          </div>
        </div>

        {/* Ông già Noel bay trên trời */}
        <div className="santa-flying">
          <div className="santa">
            🎅
            <div className="gift-bag" onClick={handleGiftClick} title="Click vào đây! 🎁">
              🎁
            </div>
          </div>
          <div className="sleigh">🛷</div>
        </div>
      </div>

      <p className="instruction">✨ Click vào giỏ quà để mở món quà đặc biệt! ✨</p>
    </div>
  );
}

export default ChristmasPage;
