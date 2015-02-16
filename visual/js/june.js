
//0代表可走，1代表不可走
var matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var grid = new PF.Grid(20, 20, matrix);
var nodes = grid.nodes;

var html = '';
for(var i in nodes){
	html += '<tr>';

	for(var j in nodes[i]){
		var selected='',
			str='';
		if(nodes[i][j]['walkable'] == false){
			selected = 'class="selected"'
			str = +nodes[i][j]['x']+'排,'+i+'号'
		}
		html += '<td local="'+nodes[i][j]['x']+','+i+'"'+selected+'>' +str+ '</td>\n';
	}

	html +='</tr>';
}
$(function(){

	table = document.getElementById('draw_area');
	
	renderView();

	$('td').live('click',function(){
		var local = $(this).attr('local')
		if($('#start').val()){
			$('#end').val(local);
		}else{
			$('#start').val(local);
		}
		$(this).addClass('pointer')
	})

	$('#reload').click(function(){
		if($('#end').val() && $('#start').val()){
			var param = $('#start').val()+','+$('#end').val(),
				param = param.split(',');

			renderView(param[0],param[1],param[2],param[3]);
			$('#start,#end').val('')
		}else{
			alert('请选择起始位置');
		}
	})

	function renderView(x1,y1,x2,y2){
		var finder = new PF.AStarFinder();

		var x1 = arguments[0] ? arguments[0] : 0,
			y1 = arguments[1] ? arguments[1] : 0,
			x2 = arguments[2] ? arguments[2] : 0,
			y2 = arguments[3] ? arguments[3] : 0;
		grid = grid.clone();
		var path = finder.findPath(x1, y1, x2, y2, grid);
		table = table || document.getElementById('draw_area');
		table.innerHTML = html;
		for(var i in path){
			table.rows[path[i][1]].cells[path[i][0]].style.background = 'red';
		}
	}
	
})


 




