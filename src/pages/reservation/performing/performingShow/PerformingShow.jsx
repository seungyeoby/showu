import React, { useEffect, useState } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";

const PerformingShow = () => {
  const navigate = useNavigate();
  const [performingShows, setPerformingShows] = useState([]);

  useEffect(() => {
    const fetchPerformingShows = async () => {
      const token = localStorage.getItem("jwtToken"); // JWT 토큰 가져오기
      try {
        const response = await fetch(
          "http://localhost:8000/reservation/performingShows",
          {
            headers: {
              Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
            },
          }
        );
        if (!response.ok) {
          throw new Error("네트워크 응답이 실패했습니다.");
        }
        const fetchedData = await response.json();
        setPerformingShows(fetchedData); // 모든 공연 데이터를 보여줌
      } catch (error) {
        console.error("공연 데이터를 가져오는 중 오류 발생:", error);
        setPerformingShows([]);
      }
    };

    fetchPerformingShows();
  }, []);

  const handleImageClick = (id) => {
    navigate(`/reservation/performing-show/showDetail/${id}`);
  };

  return (
    <S.MainContainer>
      <S.SectionTitle>상연중</S.SectionTitle>
      <S.PerformingBoxContainer>
        {performingShows.map((show) => (
          <S.PerformingBox key={show.id}>
            <S.PerformingImage
              src={show.img}
              alt={show.name}
              onClick={() => handleImageClick(show.id)}
              style={{ cursor: "pointer" }}
            />
            <h3>{show.name}</h3>
            <p>{show.venue}</p>
            <p>{show.dates}</p>
          </S.PerformingBox>
        ))}
      </S.PerformingBoxContainer>
    </S.MainContainer>
  );
};

export default PerformingShow;
