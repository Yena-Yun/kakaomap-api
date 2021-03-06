import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const { kakao } = window;


const MapContainer = ({searchPlace}) => {

    useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});

        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
    
    	const ps = new kakao.maps.services.Places(); 

        ps.keywordSearch(searchPlace, placesSearchCB); 

        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                let bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                map.setBounds(bounds);
            } 
        }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });
            // 마커에 클릭이벤트를 등록
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                // 마커 위에 장소명이 인포윈도우에 표출
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }
    
    }, [searchPlace]);



    return (
        <MapsBlock>
            <div id='myMap' style={{width: '450px', height: '350px'}}></div>
        </MapsBlock>

    );

};



const MapsBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10vh;
    width: 100%;
    padding: 20px 0px;
`;


export default MapContainer;