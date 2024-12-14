import React, { useState, useEffect } from "react";
import "./Wishlist.css";
import { styled } from 'styled-components';

const categories = [
  '인문', '사회', '교육', '공학', '자연', '의약', '예체능', '융 * 복합', '기타'
];

const EpicRewards = () => (
  <div className="css-rx5li7">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://epicgames.com/account/rewards?lang=ko"
      className="eds_wy6w1n0 eds_1be5iuz0 eds_wy6w1n2 eds_1ypbntd9 eds_wy6w1n5"
    >
      <div className="css-qkjsuf" data-testid="edsChildrenWithIcon">
        <div className="css-1baulvz">
          <div className="css-xomyej" data-component="Counter">
            <span className="css-4sfipf">₩4,600</span>
          </div>
        </div>
        <div className="css-sto15n">
          에픽 리워드
          <svg
            aria-hidden="true"
            className="eds_5nt5ak0 eds_5nt5ak9"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M15.25 4a.75.75 0 0 1 .75-.75h5.75V9a.75.75 0 0 1-1.5 0V5.81l-6.72 6.72a.75.75 0 1 1-1.06-1.06l6.72-6.72H16a.75.75 0 0 1-.75-.75M6.5 7.75a.75.75 0 0 0-.75.75v10c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75V16a.75.75 0 0 1 1.5 0v2.5a2.25 2.25 0 0 1-2.25 2.25h-10a2.25 2.25 0 0 1-2.25-2.25v-10A2.25 2.25 0 0 1 6.5 6.25H9a.75.75 0 0 1 0 1.5z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </a>
  </div>
);


const NotificationToggle = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    <div className="css-1lekzkb">
      <div className="css-k008qs">
        <div className="css-16vckbw">
          <svg
            aria-hidden="true"
            className="eds_5nt5ak0 eds_5nt5aka eds_5nt5ak6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M4.5 4.25A2.25 2.25 0 0 0 2.25 6.5v11a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25v-11a2.25 2.25 0 0 0-2.25-2.25zm15.75 3.349V6.5a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75v1.099l7.834 5.222a.75.75 0 0 0 .832 0zM3.75 9.4v8.1c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V9.401l-7.002 4.668a2.25 2.25 0 0 1-2.496 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="css-uw5w1h">
          <div className="css-70qvj9">
            <span
              className="eds_1ypbntd0 eds_1ypbntdc eds_1ypbntdk css-5039ij"
              id="wishlist-toggle-label"
            >
              위시리스트에 올린 강의가 세일 가격에 판매되거나 구매 또는 사전
              구매가 가능할 때 알림을 받으세요.
            </span>
          </div>
        </div>
      </div>
      <label htmlFor="toggle">
        <input
          type="checkbox"
          className="css-1hyfx7x"
          aria-labelledby="wishlist-toggle-label"
          id="toggle"
          data-testid="toggle"
          checked={isActive}
          onClick={handleToggle}
        />
        <div
          className="css-8lxjqs"
          role="switch"
          aria-label="위시리스트 알림 구독 전환"
          aria-checked={isActive ? "true" : "false"}
          tabIndex="0"
          style={{
            borderRadius: "10px",
            width: "36px",
            height: "20px",
            backgroundColor: isActive ? "#4CAF50" : "#ddd",
            position: "relative",
            transition: "background-color 0.3s ease",
          }}
        >
          <span
            className="css-5sbgfn"
            style={{
              width: "20px",
              height: "20px",
              position: "absolute",
              top: "0",
              left: isActive ? "16px" : "0",
              transition: "left 0.3s ease",
              backgroundColor: "#fff",
              borderRadius: "50%",
            }}
          />
        </div>
      </label>
    </div>
  );
};




const WishlistHeader = () => (
  <div className="css-gvk2ju">
    <h1 className="eds_1ypbntd0 eds_1ypbntd3 eds_1ypbntdk">
      <span>나의 위시리스트</span>
    </h1>
  </div>
);

const GameCard = ({ game, onRemove }) => {
  const handleRemove = async () => {
    const confirmDelete = window.confirm('정말로 제거하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://67296e396d5fa4901b6d1e3f.mockapi.io/my_data/${game.id}`,
          { method: 'DELETE' }
        );
        if (response.ok) {
          onRemove(game.id);
        } else {
          console.error(`삭제 실패: ${response.status}`);
          alert('서버에서 삭제하는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('제거 실패:', error);
        alert('네트워크 오류로 인해 제거에 실패했습니다.');
      }
    }
  };

  return (
    <div className="game-card">
      <div className="game-image-container">
        <img src={game.course_image} alt={game.name} className="game-image" />
      </div>
      <div className="game-details">
        <button className="game-classification">{game.classfy_name}</button>
        <div className="game-title">{game.name}</div>
        <div
          className="game-summary"
          dangerouslySetInnerHTML={{ __html: game.professor }}
        ></div>
        <div className="game-action">
          <a
            href={game.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="add-to-cart"
          >
            수강 하러가기
          </a>
        <button className="remove-game" onClick={handleRemove}>제거</button>
        </div>
      </div>
    </div>
  );
};

const GameList = ({ filterCategory }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://67296e396d5fa4901b6d1e3f.mockapi.io/my_data')
      .then((response) => response.json())
      .then((data) => setData(data || []))
      .catch((error) => console.error('데이터 가져오기 실패:', error));
  }, []);

  // 필터링된 데이터만 렌더링
  const filteredData = filterCategory
    ? data.filter((game) => game.classfy_name && game.classfy_name.trim().toLowerCase() === filterCategory.trim().toLowerCase())
    : data;

  const handleRemove = (id) => {
    setData(data.filter((game) => game.id !== id));
  };

  return (
    <div className="game-list-container">
      {filteredData.map((game) => (
        <GameCard key={game.id} game={game} onRemove={handleRemove} />
      ))}
    </div>
  );
};


const WishList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="wishlist-container">
      <Wivtop>

        {/* 필터 드롭다운 */}
        <div className="category-filter">
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">전체</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <WishlistHeader />
        <EpicRewards />
        <NotificationToggle />
      </Wivtop>

      {/* 필터링된 게임 리스트 출력 */}
      <Giv>
        <GameList filterCategory={selectedCategory} />
      </Giv>
    </div>
  );
};

const Wivtop = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const Giv = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

export default WishList;