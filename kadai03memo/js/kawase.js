// ページをreloadする方法
// reloadの基本的な使い方
function doReload() {
    // reloadメソッドによりページをリロード
    window.location.reload();
}
window.addEventListener('load', function () {
    // ページ表示完了した1分後にリロード
    // setTimeout(doReload, 100000);
    setTimeout(doReload, 100000);
});


// 日付 大全集
var dt = new Date();
//年
var year = dt.getFullYear();
//月
//1月が0、12月が11。そのため+1をする。
var month = dt.getMonth() + 1;
//日
var date = dt.getDate();
//曜日
//日曜が0、土曜日が6。配列を使い曜日に変換する。
dateT = ["日", "月", "火", "水", "木", "金", "土"];
var day = dateT[dt.getDay()];
//時
var hours = dt.getHours();
//分
var minutes = dt.getMinutes();
//秒
var seconds = dt.getSeconds();

function zeroPadding(seconds) {
    return ('0' + seconds).slice(-2);
}
var seconds = zeroPadding(seconds, 2);
function zeroPadding(minutes) {
    return ('0' + minutes).slice(-2);
}
var minutes = zeroPadding(minutes, 2);
function zeroPadding(hours) {
    return ('0' + hours).slice(-2);
}
var hours = zeroPadding(hours, 2);
function zeroPadding(day) {
    return ('0' + day).slice(-2);
}
var day = zeroPadding(day, 2);

//日付時間
// var daytime = "" + year + month + date + hours + minutes + seconds;
var daytime = "" + year + '/' + month + '/' + date + '/' + hours + ':' + minutes + ':' + seconds;
var timeonly = "" + hours + ':' + minutes + ':' + seconds;

console.log(daytime);


// 文字をセーブする
const len = $('.tab li').length;
$('#save').on('click', function () {
    for (let i = 1; i < len; i++) {
        const v = $('#memo' + i).val();
        localStorage.setItem('memo' + i, v);
    };
});;

//jsonファイルURL
var url = 'https://www.gaitameonline.com/rateaj/getrate';

//ボタン
var btn = document.querySelector('#btn');

//イベント
// btn.addEventListener('click', function () {
window.onload = function () {

    //json読み込み
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            //アラート
            var result = document.querySelector('#result');
            localStorage.setItem('00000', text);

        });

}, false;

let A = localStorage.getItem('00000');
let B = JSON.parse(A);


// 日付の名前で保存する
$(function () {
    setTimeout(function () {

        // let pair6 = C[6].currencyPairCode;
        // let ask6 = C[6].ask;
        // let pair20 = C[20].currencyPairCode;
        // let ask20 = C[20].ask;
        // localStorage.setItem(daytime, { pair6 + ":" + ask6 + ',' + pair20 + ":" + ask20 });
        localStorage.setItem(timeonly, A);

        // for (let h = 0; h < 22; h++) {
        //     let pair = C[h].currencyPairCode;
        //     let ask = C[h].ask;
        //     localStorage.setItem(daytime, pair + ask);
        // }
    }, 2000)
});


let length = localStorage.length;
console.log(length);
var EURUSDask = [];
var USDJPYask = [];
var timeLabel = [];

$(function () {
    setTimeout(function () {

        for (let ii = 2; ii <= length; ii++) {
            var keyname = localStorage.key(ii);
            var value = localStorage.getItem(keyname);
            var keyname1 = localStorage.key(2);
            var value1 = localStorage.getItem(keyname1);

            console.log(keyname);


            var jsonvalue = JSON.parse(value);
            var jsonvalue1 = JSON.parse(value1);
            let jsondata = jsonvalue.quotes;
            let jsondata1 = jsonvalue1.quotes;

            var pair6 = jsondata[6].currencyPairCode;  // eurusd
            var ask6 = jsondata[6].ask * 100 / jsondata1[6].ask;
            console.log(ask6);
            var pair20 = jsondata[20].currencyPairCode; //usdjpy
            var ask20 = jsondata[20].ask * 100 / jsondata1[20].ask;
            EURUSDask.push(ask6);
            USDJPYask.push(ask20);
            timeLabel.push(keyname);
            console.log(EURUSDask);
            console.log(USDJPYask);
        };

        // グラフの作り方

        const sampleData = {
            labels: timeLabel,
            EURUSD: EURUSDask,
            USDJPY: USDJPYask,
            sample3: [-2.97, -2.15, -0.3, -0.65, -8.84, 0.28, 2.95, 2.79, 1.79, 2.87, 0.16, 0.31],
            timestamp: ["2018/04/16 22:18", "2018/04/16 23:18", "2018/04/17 00:18", "2018/04/17 01:18", "2018/04/17 02:18", "2018/04/17 09:18", "2018/04/17 10:18", "2018/04/17 11:18", "2018/04/17 12:18", "2018/04/17 13:18", "2018/04/17 14:18", "2018/04/17 15:18"]
        };

        // グラフ作成の手順を定義
        const loadCharts = function () {
            const chartDataSet = {
                type: 'line',
                data: {
                    labels: sampleData.labels,
                    datasets: [{
                        label: 'EURUSD',
                        data: sampleData.EURUSD,
                        backgroundColor: 'rgba(60, 160, 220, 0.3)',
                        borderColor: 'rgba(60, 160, 220, 0.8)'
                    }, {
                        label: 'USDJPY',
                        data: sampleData.USDJPY,
                        backgroundColor: 'rgba(60, 190, 20, 0.3)',
                        borderColor: 'rgba(60, 190, 20, 0.8)'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    min: 99.9,
                                    max: 100.1
                                }
                            }
                        ]
                    }
                }
            };

            const ctx = document.createElement('canvas');
            document.getElementById('chart-area').appendChild(ctx);
            new Chart(ctx, chartDataSet);
        };

        // グラフ作成
        loadCharts();



    }, 3000)
});






// 通貨の情報をまず整列する

// 通貨の名前＋日付でkeyを保存して数字をvalueで保存する


// ５分ごとに画面をリロード
// 通貨の名前と数字をループで取得保存

// 参考サイト
// https://qiita.com/k_moto/items/a02543a8ffa4b4142282
// ５分ごとに全部のデータを読み出す

// 各通貨ごとに整列させて時系列データを表示

//  ロードの３秒後に配列を取得する
//  loop




// for (let i = 1; i < len; i++) {
//     const v = localStorage.getItem('memo' + i);
//     $('#memo' + i).val(v);
// };

// ロード時に表示

// for (let i = 1; i < len; i++) {
//     const v = localStorage.getItem('memo' + i);
//     $('#memo' + i).val(v);
// };


