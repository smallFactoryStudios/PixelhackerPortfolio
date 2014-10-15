//console.log("model : " + modelData.projects[1]['name']);
$('.port-close-button').click(function(){
    console.log("CLOSE");
    $.colorbox.close();
});

$('.port-img').attr("src", modelData.projects[data]['imagePath']);
$('.port-img').attr("alt", modelData.projects[data]['name']);
$('.title-port').text(modelData.projects[data]['name']);
$('.info-port').text(modelData.projects[data]['info']);
$('.tech-port').text(modelData.projects[data]['tech']);
$('.role-port').text(modelData.projects[data]['role']);
$('.agency-port').text(modelData.projects[data]['agency']);


if(modelData.projects[data]['link']){
    $('.link-port').css('display', 'block');

    $('.link-port a').text(modelData.projects[data]['link']);
    $('.link-port a').attr("href", modelData.projects[data]['link']);

}

if(modelData.projects[data]['awards']){
    $('.awards-port').css('display', 'block');

    var totalAwards = modelData.projects[data]['awards'].length;

    var awardStr = "<span class='title'>Awards</span> - ";
    console.log("totalAwards : " + totalAwards);
    for(var i=0;i<totalAwards;i++){
        awardStr += '<br>' + modelData.projects[data]['awards'][i]['award'];
        //console.log(modelData.projects[data]['awards'][i]['award']);
    }
    $('.awards-port').html(awardStr);
}
