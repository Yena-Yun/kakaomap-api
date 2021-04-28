// import React, { useState } from 'react';
// import styled from "styled-components";

// /*global kakao*/

// const Map = (props) => {

//   //첫 생성 시 (처음으로 컴포넌트를 불러오는 단계)
//   const [keyword, setKeyword] = useState("");

//   const changeKeyword = (e) => {
//     setKeyword(e.target.value);
//   }


//       // 마커를 담을 배열입니다
//     var markers = [];


//     let container = document.getElementById("map");

//     let options = {
//       center: new kakao.maps.LatLng(37.566826, 126.9786567),
//       level: 3
//     };

//     //지도를 생성
//     const map = new window.kakao.maps.Map(container, options);






//     // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
//     var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    

//     // 키워드로 장소를 검색합니다
//     searchPlaces();
  
  


//     return (
//       <>
//         <Maps id="map"></Maps>

//         <div id="menu_wrap" class="bg_white">
//           <MenuWrap class="option">
//               <div>
//                   <form onsubmit="searchPlaces(); return false;">
//                 <span style={{fontWeight: "600"}}>키워드 :</span>
//               <TextField id="keyword" onChange={changeKeyword} value="이태원 맛집" type="text" size="15" />
//                       <Button id="keyword" type="submit">검색하기</Button> 
//                   </form>
//               </div>
//           </MenuWrap>

//           <hr />

//           <ul id="placesList"></ul>
//           <div id="pagination"></div>
//         </div>

//       </>
//     )

 



//         // 키워드 검색 완료 시 호출되는 콜백함수 입니다
//         function searchPlaces() {

//           // //입력창에서 키워드를 받아온다.
//           // var keyword = document.getElementById('keyword').value;

//           if (!keyword.replace(/^\s+|\s+$/g, '')) {
//               alert('키워드를 입력해주세요!');
//               return false;
//           }

//         }


//         // 장소검색이 완료됐을 때 호출되는 콜백함수 
//         function placesSearchCB(data, status, pagination) {
//             if (status === kakao.maps.services.Status.OK) {

//                 // 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출
//                 displayPlaces(data);

//                 // 페이지 번호를 표출
//                 displayPagination(pagination);

//             } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

//                 alert('검색 결과가 존재하지 않습니다.');
//                 return;

//             } else if (status === kakao.maps.services.Status.ERROR) {

//                 alert('검색 결과 중 오류가 발생했습니다.');
//                 return;

//             }
//         }

//       //검색 결과 목록과 마커를 표출하는 함수
//       function displayPlaces(places) {

//         // //검색창 아래의 결과목록 뜨는 리스트
//         // var listEl = document.getElementById('placesList');
//         // //검색창 포함한 메뉴부분 전체
//         // var menuEl = document.getElementById('menu_wrap');


//         // //다른 노드를 담는 임시 컨테이너 역할을 하는 특수 목적의 노드
//         // //부모노드는 null이지만 appendChild()와 같은 자손객체는 가질 수 있음
//         // var fragment = document.createDocumentFragment();

//         // //괄호 안에 인자를 받지 않으면 빈 사각영역 생성
//         // var bounds = new kakao.maps.LatLngBounds();

//         // var listStr = '';
        

//         // 기존 목록에 추가되어있던 항목들을 제거
//         removeAllChildNodes(listEl);

//         // 지도에 표시되고 있는 기존 마커를 제거
//         removeMarker();
        

//         for ( var i = 0; i < places.length; i++ ) {
//           // 받아온 장소의 '좌표'를 가져옴
//           var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);

//           // 좌표를 이용하여 마커 생성 (addMarker 함수로 마커 생성)
//           var marker = addMarker(placePosition, i);

//           // 검색 결과 항목 Element를 생성
//           var itemEl = getListItem(i, places[i]); 

//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//           // LatLngBounds 객체에 가져온 좌표를 '추가(extend)'
//           bounds.extend(placePosition);

          
//           // 마커와 검색결과 항목에 mouseover 했을 때
//           // 해당 장소 마커의 인포윈도우에 장소명을 표시
//           // mouseout 했을 때는 인포윈도우를 닫음
//           // eslint-disable-next-line no-loop-func
//           (function(marker, title) {
//             kakao.maps.event.addListener(marker, 'mouseover', function () {
//                 //인포윈도우 생성하는 함수 실행
//                 displayInfowindow(marker, title);
//               });

//               kakao.maps.event.addListener(marker, 'mouseout', function() {
//                 //인포윈도우를 제거
//                 infowindow.close();
//               });

//             itemEl.onmouseover = function () {
//                 //인포윈도우 생성하는 함수 실행
//                 displayInfowindow(marker, title);
//               };

//             itemEl.onmouseout = function () {
//                 //인포윈도우를 제거
//                 infowindow.close();
//             };
            
//           })(marker, places[i].place_name);

//             //임시 노드 객체에 itemEl(검색결과 항목) 추가
//             fragment.appendChild(itemEl);
//           }

//           // 검색창 아래의 결과목록에 추가
//           listEl.appendChild(fragment);
        
//           //(추가 후 menuEl(메뉴부분 전체)에서 스크롤 top으로 올림 => 필요한지?)
//           menuEl.scrollTop = 0;

//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//           map.setBounds(bounds);
//       }

        
        
//       // 검색결과 항목을 Element로 반환하는 함수입니다
//       // (키워드 검색 아래부분에 검색결과 목록 생성하는 부분)
//       function getListItem(index, places) {

//         //li 태그를 생성하는 변수
//         var el = document.createElement('li');
        
//         //첫 itemStr 생성 - index 번호 적힌 마커와 place의 이름(h5 - 살짝 굵은 글씨)
//         var itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
//                     '<div class="info">' +
//                     '   <h5>' + places.place_name + '</h5>';

        
//         //도로명 주소가 있으면
//         if (places.road_address_name) {
//           //itemStr에 더해줌
//             itemStr += '    <span>' + places.road_address_name + '</span>' +
//                         '   <span class="jibun gray">' +  places.address_name  + '</span>';
        
//         //도로명 주소가 없으면 그냥 지번주소만
//         } else {
//             itemStr += '    <span>' +  places.address_name  + '</span>'; 
//         }
        
//         //전화번호는 무조건 포함
//         itemStr += '  <span class="tel">' + places.phone  + '</span>' +
//                     '</div>';           


//         //생성되는 li 태그의 하위 HTML(children text)에 itemStr 추가 
//         //(=> 검색창 아래의 목록에 표시됨)
//         el.innerHTML = itemStr;

//         //className으로는 'item' 지정
//         el.className = 'item';

//         return el;
//       }

        
        
//       // 마커를 생성하고 지도 위에 마커를 표시하는 함수
//         function addMarker(position, idx, title) {
        
//           // 마커 이미지 url (스프라이트 이미지 사용)
//           var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; 
          
//           // 마커 이미지 크기
//           var imageSize = new kakao.maps.Size(36, 37);

//           // 마커 이미지 옵션
//           var imgOptions = {
//             spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//             spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//             offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//           };

//           // 위의 3가지를 넣어 마커 이미지 생성
//           var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
          

//           // 마커 위치와 마커 이미지로 마커 생성
//           var marker = new kakao.maps.Marker({
//                   position: position,
//                   image: markerImage 
//               });

//           //지도 위에 마커를 표출
//           marker.setMap(map);

//           //마커 배열에 생성된 마커를 추가
//           markers.push(marker);  

//           //생성된 마커를 리턴
//           return marker;
//       }

        
//       // 지도 위에 표시되고 있는 마커를 모두 제거
//         function removeMarker() {

//         //마커 배열에서 하나씩 꺼내
//         for (var i = 0; i < markers.length; i++) {
//             //마커 배열의 i번째가 map에 나타나는 부분을 없앰(= 마커를 위치시키는 곳을 null로 만듦)
//               markers[i].setMap(null);
//           }

//           //마커 배열도 (다 비우고) 빈 배열로 반환
//           markers = [];
//       }

        
//       // 검색결과 목록 하단에 페이지번호를 표시하는 함수
//         function displayPagination(pagination) {
          
//           //pagination 부분을 선택
//           var paginationEl = document.getElementById('pagination');

//           //fragment 변수 선언
//           var fragment = document.createDocumentFragment();

//           //i 변수 선언
//           var i;
          

//           // 기존에 추가된 페이지번호를 삭제
//           // paginationEl이 자식객체를 가지고 있는 동안 반복
//           while (paginationEl.hasChildNodes()) {

//               //paginationEl의 맨 마지막 자식객체부터 제거
//               paginationEl.removeChild(paginationEl.lastChild);
//           }


//           for (i = 1; i <= pagination.last; i++) {
//               //a 태그 생성하는 변수
//             var el = document.createElement('a');
//               //클릭 시 이동하는 곳은 임의로 지정
//             el.href = "#";
//             //a 태그 내의 text는 i (인덱스 숫자)
//               el.innerHTML = i;

//             //만약 i가 현재 페이지 번호라면
//             if (i === pagination.current) {
//                 //el의 클래스명을 on으로 설정
//               el.className = 'on';
              
//               //현재 페이지가 아니라면
//             } else {
//               //el 클릭 시 콜백함수 실행
//               el.onclick = (function (i) {
//                     //i번째 페이지로 이동시키는 함수 반환
//                       return function() {
//                           pagination.gotoPage(i);
//                       }
//                   })(i); //i가 바뀔 때마다 실행
//               }

//             //임시 노드 객체에 el을 자식 노드로 추가
//               fragment.appendChild(el);
//           }

//           //html의 선택된 페이지네이션 부분에 fragment을 자식노드로 추가
//           paginationEl.appendChild(fragment);
//       }

        
        
//       // 검색결과 목록 또는 마커에 마우스를 올릴 때 호출되는 함수
//       // 인포윈도우에 장소명 표시
//         function displayInfowindow(marker, title) {
//           //인포윈도우에 들어갈 content 생성
//           var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//           //infowindow 객체에 content 넣기
//           infowindow.setContent(content);

//           //지도에 인포윈도우를 올림
//           infowindow.open(map, marker);
//       }

        
        
//       // 검색결과 목록의 자식 Element를 모두 제거하는 함수
//         function removeAllChildNodes(el) {
//           //el에 자식노드가 있는 동안 반복
//           while (el.hasChildNodes()) {
//               //el의 마지막 자식객체부터 제거
//               el.removeChild (el.lastChild);
//           }
//         }
        




//       // }
//     //   ); //여기까지가 지도 로드 시 실행되는 함수(안에 검색부분 같은 곳은 조금 빼야 함)
//     // };
//   // }





// }


// const Maps = styled.div`
//   width: 70%;
//   height: 100%;
//   position: relative;
//   overflow: hidden;
// `;

// const MenuWrap = styled.div`
//   display: flex;
//   width: 50em;
//   background-color: white;
//   float: left;
//   position: relative;
//   z-index: 3;
// `;

// const TextField = styled.input`
//   width: 100px;
//   height: auto;
// `;

// const Button = styled.button`
//   width: 30px;
//   height: auto;
// `;



// export default Map;