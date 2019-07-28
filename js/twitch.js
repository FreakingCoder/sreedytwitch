/**
 * Created by rangapuram on 7/23/19.
 */


window.addEventListener('DOMContentLoaded', function(event){

        var totalPages = 0;
        var pageSize = 5;
        var pageMap = null;
        var searchUrl = '/api';
        var currentPageNum = 1;

        var currentPage = document.getElementById('currentPage');

        document.getElementById('leftBtn').onclick = function(e){

            e.preventDefault();
            if(currentPageNum > 1){
                currentPageNum-=1;
                currentPage.innerText = currentPageNum+'/'+totalPages;
                renderPageCards(currentPageNum);
            }

        };
        document.getElementById('rightBtn').onclick = function(e){
            e.preventDefault();
            if(currentPageNum < totalPages){
                currentPageNum+=1;
                currentPage.innerText = currentPageNum+'/'+totalPages;
                renderPageCards(currentPageNum);
            }
        };

        document.getElementById('searchBtn').onclick = function(e){

            var searchInput = document.getElementById('searchInput');
            currentPageNum = 1;
            getData(searchInput.value);

        };

        function setPages(pages){

            pageMap = new Map();
            totalPages = Math.ceil(pages.length/pageSize);
            var i =1;
            while(i <= totalPages){
                pageMap.set(i, pages.slice((i-1)*pageSize, (i*pageSize)));
                i++;
            }

        }

        function renderPageCards(pageNum){

            var page = pageMap.get(pageNum);
            currentPageNum = pageNum;

            var cardsContainer = document.getElementById('cards');
            cardsContainer.innerHTML ='';

            page.forEach(function (item) {

                var rowContainer = document.createElement('div');
                rowContainer.classList.add('divTableRow');

                var cardContainer = document.createElement('div');
                cardContainer.classList.add('card-flex');
                cardContainer.classList.add('card-flex-top');

                var leftContainer = document.createElement('div');
                leftContainer.classList.add('card-left-flex');

                var oImg = document.createElement("img");
                oImg.setAttribute('src', item.preview.small);
                oImg.setAttribute('width', '100px');
                leftContainer.appendChild(oImg);
                cardContainer.appendChild(leftContainer);

                var rightContainer = document.createElement('div');
                rightContainer.classList.add('card-right-flex');

                var hdisplay = document.createElement('span');
                hdisplay.classList.add('bold-font');
                hdisplay.innerText = item.channel.display_name;
                rightContainer.appendChild(hdisplay);

                var gameNameContainer = document.createElement('div');
                var gameSpan = document.createElement('span');
                gameSpan.innerText = "GameName: "+item.game;
                gameNameContainer.appendChild(gameSpan);
                rightContainer.appendChild(gameNameContainer);

                var descContainer = document.createElement('div');
                descContainer.classList.add('block-ellipsis');
                descContainer.innerText = 'Description: '+item.channel.description;
                rightContainer.appendChild(descContainer);
                cardContainer.appendChild(rightContainer);
                rowContainer.appendChild(cardContainer);
                cardsContainer.appendChild(rowContainer);

            });
        }




        function renderGames(gamesList){

            var totalElement = document.getElementById("totalGames");
            totalElement.innerText =  gamesList._total;
            setPages(gamesList.streams);
            currentPage.innerText = currentPageNum+'/'+totalPages;
            renderPageCards(currentPageNum);

        }

        function getData(val){

            var params = val?val:'';
            var xmlHttpReq = new XMLHttpRequest();
            xmlHttpReq.open('GET',searchUrl+'?search='+params,true);
            xmlHttpReq.onload = function(){
                if (xmlHttpReq.status != 200) {
                    console.log(xmlHttpReq.status +':'+ xmlHttpReq.statusText);
                } else {
                    renderGames(JSON.parse(xmlHttpReq.response));
                }
            };

            xmlHttpReq.onerror = function(){
                console.log("Request Failed: "+ searchUrl,params);
            };
            xmlHttpReq.send();
        }

        getData();

});



