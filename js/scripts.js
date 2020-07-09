function inicio()
{
	$('#tot_carrega').hide();
	$('#piechart_3d').hide();
}

function exibir(origem)
{
	tot = parseInt(document.getElementById('tot_carrega').innerHTML);
	
	if (origem == 'dados')
	{
		if (tot > 0)
		{
			$('#tbl_resultado').show();
			$('#cidades').show();
			$('#mod_venda').show();
			$('#tbl_resultado_length').show();
			$('#tbl_resultado_paginate').show();
			$('#tbl_resultado_filter').show();
		}
	}
	else if (origem == 'qtde' || origem == 'vlr')
	{
		$('#piechart_3d').show();
	}
}

function ocultar(origem)
{
	if (origem == 'dados')
	{
		$('#piechart_3d').hide();
	}
	else if (origem == 'qtde' || origem == 'vlr')
	{
		$('#tbl_resultado').hide();
		$('#cidades').hide();
		$('#mod_venda').hide();
		$('#tbl_resultado_length').hide();
		$('#tbl_resultado_paginate').hide();
		$('#tbl_resultado_filter').hide();
	}
	
	exibir(origem);
}

function carrega()
{
	total = parseInt(document.getElementById('tot_carrega').innerHTML);
	
	if (total > 0)
		ocultar('dados');
	else
	{
		ocultar('dados');
		
		var xmlhttp = new XMLHttpRequest();
		var url = "js/imoveis.json";

		var lista = [];

		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var myArr = JSON.parse(this.responseText);
				myTable(myArr);
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
		
		document.getElementById('tot_carrega').innerHTML = total + 1;
	}
}

function myTable(arr)
{
	lista = arr;
	
	var sel = document.createElement("select");   // Create a <button> element
	sel.id = 'cidades';
	opt = document.createElement("option");
	opt_lst = [];
	
	var sel_mod = document.createElement("select");   // Create a <button> element
	sel_mod.id = 'mod_venda';
	opt_mod = document.createElement("option");
	opt_lst_mod = [];
	
	tbl = document.createElement("table");   // Create a <button> element
	tbl.border = '1';
	tbl.id = 'tbl_resultado';
	thead = document.createElement("thead");
	trh = document.createElement("tr");
	
	cols = ['Endereco','Bairro','Cidade','Modalidade de Venda','Preco (R$)','Valor Avaliacao','Desconto (%)']
	for (i=0;i<7;i++)
	{
		th = document.createElement("th");
		th.innerHTML = cols[i];
		trh.appendChild(th);
		thead.appendChild(trh);
	}
	tbl.appendChild(thead);
	
	tbody = document.createElement("tbody");
	trb = document.createElement("tr");
	
	for(i = 0; i < arr.length; i++)
	//for(i = 0; i < 50; i++)
	{
		td = document.createElement("td");
		td.innerHTML = arr[i].endereco;
		trb.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = arr[i].bairro;
		trb.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = arr[i].cidade;
		trb.appendChild(td);
		existe = opt_lst.indexOf(arr[i].cidade);
		if (existe == -1)
			opt_lst.push(arr[i].cidade);
		
		td = document.createElement("td");
		td.innerHTML = arr[i].modalidadeVenda;
		existe_mod = opt_lst_mod.indexOf(arr[i].modalidadeVenda);
		if (existe_mod == -1)
			opt_lst_mod.push(arr[i].modalidadeVenda);
		trb.appendChild(td);
		
		td = document.createElement("td");
		preco_oferta = arr[i].precoOferta;
		t = preco_oferta.indexOf(",");
		if (t == -1)
			preco_oferta = preco_oferta + ',00' ;
		td.innerHTML = preco_oferta;
		
		trb.appendChild(td);
		
		td = document.createElement("td");
		valor_avaliacao = arr[i].valorAvaliacao;
		tt = valor_avaliacao.indexOf(",");
		if (tt == -1)
			valor_avaliacao = valor_avaliacao + ',00' ;
		td.innerHTML = valor_avaliacao;
		trb.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = arr[i].porcentagemDesconto;
		trb.appendChild(td);
		
		tbody.appendChild(trb)
		
		tbl.appendChild(tbody);
		
		trb = document.createElement("tr");
	}
	
	
	opt_lst.sort();
	opt_lst.unshift('Selecione a Cidade');
	
	for (i=0;i<opt_lst.length;i++)
	{
		opt.value = opt_lst[i];
		opt.innerHTML = opt_lst[i];
		
		sel.appendChild(opt);
		
		opt = document.createElement("option");
	}
	
	opt_lst_mod.sort();
	opt_lst_mod.unshift('Selecione a Modalidade');
	
	for (i=0;i<opt_lst_mod.length;i++)
	{
		opt_mod.value = opt_lst_mod[i];
		opt_mod.innerHTML = opt_lst_mod[i];
		
		sel_mod.appendChild(opt_mod);
		
		opt_mod = document.createElement("option");
	}
	
	document.body.appendChild(sel);
	document.body.appendChild(sel_mod);
	
	dtTable(tbl);
	document.body.appendChild(tbl);
}


function popula(val, tp=null)
{
	if (val == 'Selecione a Cidade' || val == 'Selecione a Modalidade')
		val = '';
	
	var table = $('#tbl_resultado').DataTable();
 
	// Search for a data point
	table.search(val).draw();
	
	if (tp == 'cid')
		document.getElementById('mod_venda').value = 'Selecione a Modalidade';
	else if (tp == 'mod')
		document.getElementById('cidades').value = 'Selecione a Cidade';
}

function dtTable(tbl)
{
	$(document).ready(function() {
		$('#tbl_resultado').DataTable( {
			searching: true,
			paging: true,
			info: false,
			"language": {
				"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"
			}
		} );
	} );
	
	onChange();
}

function onChange()
{
	$(document).ready(function(){
		$("#cidades").change(function(){
			popula($("#cidades").val(), 'cid');
		});
	});
	
	$(document).ready(function(){
		$("#mod_venda").change(function(){
			popula($("#mod_venda").val(), 'mod');
		});
	});
}