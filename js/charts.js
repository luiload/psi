function carrega_graf(origem)
{
	$('#piechart_3d').show();
	google.charts.load('current', {'packages':['corechart']});
	
	if (origem == 'qtde')

		google.charts.setOnLoadCallback(drawChart_qtde);
	else if (origem == 'vlr')
		google.charts.setOnLoadCallback(drawChart_vlr);
}

function drawChart_qtde()
{
	$.ajax({
        url: "js/imoveis.json",
        dataType: "JSON",
        success: function (jsonData) 
		{
			arr_graf = [];
            var dataArray = [
                ['Modalidade', 'Quantidade'],
            ];
			
            for (var i = 0; i < jsonData.length; i++) 
            //for (var i = 0; i < 10; i++) 
			{
				existe_mod = arr_graf.indexOf(jsonData[i].modalidadeVenda);
				if (existe_mod == -1)
				{
					nw_arr = jsonData.filter((user, index, array) => user.modalidadeVenda === jsonData[i].modalidadeVenda);
					arr_graf.push(jsonData[i].modalidadeVenda, nw_arr.length);
					var row = [jsonData[i].modalidadeVenda, nw_arr.length];
					dataArray.push(row);
					
					nw_arr = [];
				}	
            }
			
			var options = {
				title: 'Quantidade de Contratos por Modalidade',
				is3D: true
			};

            var data = google.visualization.arrayToDataTable(dataArray);
			
			var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
			chart.draw(data, options);
        }
    });
}

function drawChart_vlr()
{
	$.ajax({
        url: "js/imoveis.json",
        dataType: "JSON",
        success: function (jsonData) 
		{
			arr_graf = [];
            var dataArray = [
                ['Modalidade', 'Valor'],
            ];
			
			
            for (var i = 0; i < jsonData.length; i++) 
            //for (var i = 0; i < 10; i++) 
			{
				existe_mod = arr_graf.indexOf(jsonData[i].modalidadeVenda);
				
				if (existe_mod == -1)
				{
					nw_arr = jsonData.filter((user, index, array) => user.modalidadeVenda === jsonData[i].modalidadeVenda);
					arr_graf.push(jsonData[i].modalidadeVenda, nw_arr.length);
					
					soma = 0.00;
					for (t=0;t<nw_arr.length;t++)
					{
						preco_oferta = nw_arr[t].precoOferta;
						preco_oferta = preco_oferta.replace(',','.');
						preco_oferta = parseFloat(preco_oferta);
						
						soma = preco_oferta;
					}
					
					var row = [jsonData[i].modalidadeVenda, soma];
					dataArray.push(row);
					
					nw_arr = [];					
				}
				
            }
			
			var options = {
				title: 'Valor dos Contratos por Modalidade',
				is3D: true
			};

            var data = google.visualization.arrayToDataTable(dataArray);
			
			var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
			chart.draw(data, options);
        }
    });
}