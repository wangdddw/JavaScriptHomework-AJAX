var travelData = [];
var selectZone = [];
//下拉式選單綁定
var selectList = document.getElementById('areaId');
//呈現旅遊地區的清單綁定
var travelArea = document.querySelector('.list');
//旅遊地區清單抬頭綁定
var titleArea = document.querySelector('.titleZone');
//熱門行政區按鈕綁定
var hotSearchBtnList = document.getElementById('hotSearchBtnList');


//AJAX資料撈取
var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload = function(){
    const data = JSON.parse(xhr.responseText);
    travelData = data.result.records;
    
    // defaltData();
     getAreaList();
}

// function defaultData(){

// }
//取得行政區域
function getAreaList(){
    let areaList = [];
    //一開始的預設選項
    let str = '<option value="請選擇行政區域">---請選擇行政區域---</option>';
    //過濾成乾淨的區域陣列新增到areaList
    for(let i = 0; i<travelData.length;i++){
        areaList.push(travelData[i].Zone);
    }
    //使用forEach判斷陣列裡資料所有值是否吻合，整理好後再加入進selectZone製作下拉式選單
    areaList.forEach(function(value){
        if(selectZone.indexOf(value) == -1){
            selectZone.push(value);
        }
    })
    for(let j = 0 ; j<selectZone.length; j++){
        str +=`<option value="${selectZone[j]}">${selectZone[j]}</option>`;
    }
    selectList.innerHTML = str;
}
//下拉式選單監聽
selectList.addEventListener('change',selectArea,false);
//熱門行政區按鈕監聽事件
hotSearchBtnList.addEventListener('click',updateArea,false);

//下拉式選單function
function selectArea(){
    let select = selectList.value;
    let len = travelData.length;
    let str = '';
    for(let i = 0 ; i<len ; i++){
        if(select == travelData[i].Zone){
            console.log(select);
            str +=`<li class="travelList">
            <img class="regionPic" src="${travelData[i].Picture1}">
            <h3 class="areaName">${travelData[i].Name}</h3>
            <p class="areaZone">${travelData[i].Zone}</p>
            <p class="openTime"><img class="clock" src="images/icons_clock.png">${travelData[i].Opentime}</p>
            <p class="address"><img class="pin" src="images/icons_pin.png">${travelData[i].Add}</p>
            <p class="telphone"><img class="phone" src="images/icons_phone.png">${travelData[i].Tel}</p>
            <p class="ticketInfo"><img class="ticket" src="images/icons_tag.png">${travelData[i].Ticketinfo}</p></li>`;
            titleArea.textContent = travelData[i].Zone;
            travelArea.innerHTML = str;
        }
    }
 }

 //熱門行政區按鈕function
function updateArea(e){
    let select = e.target.textContent;
    let str = '';
    if(e.target.nodeName !== 'LI'){return};
    for(let i = 0; i<travelData.length ; i++){
       
        if(select == travelData[i].Zone){
            console.log(select);
            str +=`<li class="travelList">
                    <img class="regionPic" src="${travelData[i].Picture1}">
                    <h3 class="areaName">${travelData[i].Name}</h3>
                    <p class="areaZone">${travelData[i].Zone}</p>
                    <p class="openTime"><img class="clock" src="images/icons_clock.png">${travelData[i].Opentime}</p>
                    <p class="address"><img class="pin" src="images/icons_pin.png">${travelData[i].Add}</p>
                    <p class="telphone"><img class="phone" src="images/icons_phone.png">${travelData[i].Tel}</p>
                    <p class="ticketInfo"><img class="ticket" src="images/icons_tag.png">${travelData[i].Ticketinfo}</p></li>`;
                    titleArea.textContent = travelData[i].Zone;
                    travelArea.innerHTML = str;
            }
    }
}