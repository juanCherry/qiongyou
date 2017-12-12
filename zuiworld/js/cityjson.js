$(document).ready(function(){
  var worldCenter = $('#worldCenter');
  console.log(worldCenter);
  $.getJSON('http://127.0.0.1:8888/getCityWalk',function(data){
    console.log(data);
    var num = Math.ceil(data.length / 3);
    //求除以后的余数
    var yunum = data.length % 3 ;
    var box = $('.box');
    for(var i = 0 ; i < num ; i++){
      //中间用于存放图片和内容的盒子
      var totaldiv = $('<div></div>').addClass('totaldiv');
      if(i==0){
        totaldiv.css('z-index','2');
      }
      if(yunum!=0){
        if(i == (num-1)){
          for(var j = 0 ; j < yunum ; j++){
            var k = (num-1)*3+j;
            create(k,j);
          }
          box.append(totaldiv);
        }else {
          for(var j = 0 ; j < 3 ; j++){
            var k = i*3+j;
            create(k,j);
          }
          box.append(totaldiv);
        }
      }else{
        for(var j = 0 ; j < 3 ; j++){
          var k = i*3+j
          create(k,j);
        }
        box.append(totaldiv);
      }

      function create(k,j) {
        var showdiv = $('<div></div>').addClass('showdiv').css({'top':(50*j+300*j)+'px'
          });
        var showimg = $('<img>').addClass('showimg');
        var rightdiv = $('<div></div>');
        var firstp = $('<p></p>').addClass('firstp');
        var span = $('<span></span>').addClass('firstspan');
        var secondp = $('<p></p>').addClass('secondp');
        var thirdp = $('<p></p>').addClass('thirdp');
        var fouthp = $('<p></p>').addClass('fouthp');
        var fouthlabel = $('<label></label>').addClass('fouthlabel');
        var fivep = $('<p></p>').addClass('fivep');

        showdiv.append(showimg).append(rightdiv);
        // firstp.append(span);
        fouthp.append(fouthlabel);
        rightdiv.append(firstp).append(secondp).append(thirdp).append(fouthp).append(fivep);

          firstp.text(data[k].address).append(span);
          span.html(data[k].browseCount+'次浏览&nbsp;'+data[k].soldCount+'件已售');
          showimg.attr('src',data[k].imgurl);
          secondp.text(data[k].title);
          for(var m = 0 ; m < data[k].introduce.length; m++){
            thirdp.append('<span>'+data[k].introduce[m]+'<span><br/>');
          }
          fouthlabel.text(data[k].oldPrice);
          fouthp.append('&nbsp;<span>'+data[k].newPrice+'</span>元起');
          fivep.text('立即订购');
        totaldiv.append(showdiv);
      }
    }

    //创建分页标签
    var w = 0;
    var fenye = $('#fenyeId');
    var shangspan = $('<span></span>').addClass('lastspan').text('上一页');
    fenye.append(shangspan);
    for(var q = 0 ; q < num ; q++){
      w++;
      var Pspan = $('<span></span>').addClass('Pspan').text(w);
      fenye.append(Pspan);
    }
    var lastspan = $('<span></span>').addClass('lastspan').text('下一页');
    fenye.append(lastspan);

    var total =  $('.totaldiv');

      $('#fenyeId').children().click(function(){
        var text = $(this).text();
        if(text == '下一页'){
          for(var i = 0 ; i < total.length; i++){
            var index = $(total[i]).css('z-index');

            if(index == 3){
              var totalindex = $(total[i]).index();
              console.log(totalindex);
              if(totalindex < (num - 1)){
                total.css({
                  'z-index':'1',
                })
                $(total[totalindex+1]).css({
                  'z-index':'3',
                })
                $('#fenyeId').children().css({
                  'background-color':'#32312d'
                })
                $(this).css({
                  'background-color':'lightskyblue'
                })
                break;
              }else{
                $('#fenyeId').children().css({
                  'background-color':'#32312d'
                })
                $(this).css({
                  'background-color':'lightskyblue'
                })
                alert('没有下一页了')
              }
            }else if(i == 0 && index == 2){
              total.css({
                'z-index':'1'
              })
              $(total[1]).css({
                'z-index':'3'
              })
              $('#fenyeId').children().css({
                'background-color':'#32312d'
              })
              $(this).css({
                'background-color':'lightskyblue'
              })
              break;
            }
          }
        }else if(text == '上一页'){
          for(var i = 0 ; i < total.length; i++){
            var index = $(total[i]).css('z-index');

            if(index == 3){
              var totalindex = $(total[i]).index();
              console.log(totalindex);
              if(totalindex > 0){
                total.css({
                  'z-index':'1',
                })
                $(total[totalindex-1]).css({
                  'z-index':'3',
                })
                $('#fenyeId').children().css({
                  'background-color':'#32312d'
                })
                $(this).css({
                  'background-color':'lightskyblue'
                })
                break;
              }else{
                $('#fenyeId').children().css({
                  'background-color':'#32312d'
                })
                $(this).css({
                  'background-color':'lightskyblue'
                })
                alert('没有上一页了')
              }
            }else if(i == 0 && index == 2){
              $(this).css({
                'background-color':'lightskyblue'
              })
              alert('没有上一页了');
            }
          }
        }else{
          total.css({
            'z-index':'1',
          })
          $(total[text-1]).css({
            'z-index':'3',
          })
          $('#fenyeId').children().css({
            'background-color':'#32312d'
          })
          $(this).css({
            'background-color':'lightskyblue'
          })
        }

      })


/*
    $('.pageone').click(function(){
      console.log(1111);
      total.css({
        'z-index':'1',
      })
      $(total[0]).css({
        'z-index':'3',
      })
      $('#fenyeId').children().css({
        'background-color':'#32312d'
      })
      $(this).css({
        'background-color':'lightskyblue'
      })
    })
    $('.pagetwo').click(function(){
      if(total.length > 1){
        total.css({
          'z-index':'1',
        })
        $(total[1]).css({
          'z-index':'3',
        })
      }
      else{
        alert('没有下一页了');
      }
      $('#fenyeId').children().css({
        'background-color':'#32312d'
      })
      $(this).css({
        'background-color':'lightskyblue'
      })
    })
    $('.pagenext').click(function(){
      //判断现在出现的是第几页
      for(var i = 0 ; i < total.length; i++){
        var index = $(total[i]).css('z-index');
        if(index == 3){
          var indexi = i;
          //判断是否是最后一页
          //不是最后一页
          if(indexi < (num - 1)){
            total.css({
              'z-index':'1',
            })
            $(total[i+1]).css({
              'z-index':'3',
            })
          }else{
            alert('没有下一页了')
          }
        }
        if(i == 0 && index == 2){
          total.css({
            'z-index':'1'
          })
          $(total[1]).css({
            'z-index':'3'
          })
          $('#fenyeId').children().css({
            'background-color':'#32312d'
          })
          $(this).css({
            'background-color':'lightskyblue'
          })
        }
      }
    })
    */
  })


})
