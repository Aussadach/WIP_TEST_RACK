var socket = io()
var frmObj = {}

$("form").submit( e => {
    e.preventDefault()

    var selDate = $('#selDate').val()
    var exDate = selDate.split(' - ')

    frmObj = {
        dateStart: moment(exDate[0], 'DD/MM/YY HH:mm').format('YYYY-MM-DD HH:mm:00'),
        dateEnd: moment(exDate[1], 'DD/MM/YY HH:mm').format('YYYY-MM-DD HH:mm:59'),
        report: $('#selReport').val(),
    }

    //console.log(obj)

    socket.emit('history report', frmObj)
})

socket.on('history report', obj => {
    console.log(obj)
    var a = moment(frmObj.dateEnd)
    var b = moment(frmObj.dateStart)
    var dateDiff = a.diff(b, obj.report)
    console.log(dateDiff)

    var html = ""
    if (obj.report == 'hours') {
        html = `<table id="autosTbl" class="table table-striped table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th rowspan="2" class="text-center">Date</th>
                            <th rowspan="2" class="text-center">Time</th>
                            <th colspan="3" class="text-center">Left In</th>
                            <th colspan="3" class="text-center">Left Out</th>
                            <th colspan="3" class="text-center">Right In</th>
                            <th colspan="3" class="text-center">Right Out</th>
                            <th rowspan="2" class="text-center">Speed<br/>(pcs/min)</th>
                        </tr>
                        <tr>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>`
        if (typeof obj.data != 'undefined') {
            var data = obj.data
            for (let i = 0; i <= dateDiff; i++) {
                var dt = moment(frmObj.dateStart).add(i, 'hours').format('YYYY-MM-DD HH:mm')
                var idxLI = data.LeftIn.findIndex( s => s.Time_Stamp == dt )
                var idxLO = data.LeftOut.findIndex( s => s.Time_Stamp == dt )
                var idxRI = data.RightIn.findIndex( s => s.Time_Stamp == dt )
                var idxRO = data.RightOut.findIndex( s => s.Time_Stamp == dt )

                html += `<tr>
                            <td align="center">${moment(dt).format('YYYY-MM-DD')}</td>
                            <td align="center">${moment(dt).format('HH:mm')}</td>
                            <td align="right">${idxLI >= 0 ? data.LeftIn[idxLI].NoStrip : 0}</td>
                            <td align="right">${idxLI >= 0 ? data.LeftIn[idxLI].HalfStrip : 0}</td>
                            <td align="right">${idxLI >= 0 ? data.LeftIn[idxLI].NG : 0}</td>
                            <td align="right">${idxLO >= 0 ? data.LeftOut[idxLO].NoStrip : 0}</td>
                            <td align="right">${idxLO >= 0 ? data.LeftOut[idxLO].HalfStrip : 0}</td>
                            <td align="right">${idxLO >= 0 ? data.LeftOut[idxLO].NG : 0}</td>
                            <td align="right">${idxRI >= 0 ? data.RightIn[idxRI].NoStrip : 0}</td>
                            <td align="right">${idxRI >= 0 ? data.RightIn[idxRI].HalfStrip : 0}</td>
                            <td align="right">${idxRI >= 0 ? data.RightIn[idxRI].NG : 0}</td>
                            <td align="right">${idxRO >= 0 ? data.RightOut[idxRO].NoStrip : 0}</td>
                            <td align="right">${idxRO >= 0 ? data.RightOut[idxRO].HalfStrip : 0}</td>
                            <td align="right">${idxRO >= 0 ? data.RightOut[idxRO].NG : 0}</td>
                            <td align="right">${(((idxLI >= 0 ? data.LeftIn[idxLI].Former : 0) + (idxLO >= 0 ? data.LeftOut[idxLO].Former : 0) + (idxRI >= 0 ? data.RightIn[idxRI].Former : 0) + (idxRO >= 0 ? data.RightOut[idxRO].Former : 0)) / 60).toFixed(0)}</td>
                        </tr>`
            }
            /*
            data.LeftIn.forEach((item, index) => {
                var dt = item.Time_Stamp.split(" ")
                html += `<tr>
                            <td align="center">${dt[0]}</td>
                            <td align="center">${dt[1]}</td>
                            <td align="right">${item.NoStrip}</td>
                            <td align="right">${item.HalfStrip}</td>
                            <td align="right">${item.NG}</td>
                            <td align="right">${data.LeftOut[index].NoStrip}</td>
                            <td align="right">${data.LeftOut[index].HalfStrip}</td>
                            <td align="right">${data.LeftOut[index].NG}</td>
                            <td align="right">${data.RightIn[index].NoStrip}</td>
                            <td align="right">${data.RightIn[index].HalfStrip}</td>
                            <td align="right">${data.RightIn[index].NG}</td>
                            <td align="right">${data.RightOut[index].NoStrip}</td>
                            <td align="right">${data.RightOut[index].HalfStrip}</td>
                            <td align="right">${data.RightOut[index].NG}</td>
                            <td align="right">${((item.Former + data.LeftOut[index].Former + data.RightIn[index].Former + data.RightOut[index].Former) / 60).toFixed(0)}</td>
                        </tr>`
            })
            */
        } else {
            html += `<tr><td colspan="15" align="center">No Data</td></tr>`
        }
        html += `</tbody></table>`
    } else if (obj.report == 'days') {
        html = `<table id="autosTbl" class="table table-striped table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th rowspan="2" class="text-center">Date</th>
                            <th colspan="3" class="text-center">Left In</th>
                            <th colspan="3" class="text-center">Left Out</th>
                            <th colspan="3" class="text-center">Right In</th>
                            <th colspan="3" class="text-center">Right Out</th>
                            <th rowspan="2" class="text-center">Speed<br/>(pcs/min)</th>
                        </tr>
                        <tr>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">No Strip</th>
                            <th class="text-center">Half Strip</th>
                            <th class="text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>`
        if (typeof obj.data != 'undefined') {
            var data = obj.data
            for (let i = 0; i <= dateDiff; i++) {
                var dt = moment(frmObj.dateStart).add(i, 'days').format('YYYY-MM-DD')
                var idxLI = data.LeftIn.findIndex( s => s.Time_Stamp == dt )
                var idxLO = data.LeftOut.findIndex( s => s.Time_Stamp == dt )
                var idxRI = data.RightIn.findIndex( s => s.Time_Stamp == dt )
                var idxRO = data.RightOut.findIndex( s => s.Time_Stamp == dt )

                html += `<tr>
                            <td align="center">${moment(dt).format('YYYY-MM-DD')}</td>
                            <td align="right">${idxLI >= 0 ? data.LeftIn[idxLI].NoStrip : 0}</td>
                            <td align="right">${idxLI >= 0 ? data.LeftIn[idxLI].HalfStrip : 0}</td>
                            <td align="right">${idxLI >= 0 ? data.LeftIn[idxLI].NG : 0}</td>
                            <td align="right">${idxLO >= 0 ? data.LeftOut[idxLO].NoStrip : 0}</td>
                            <td align="right">${idxLO >= 0 ? data.LeftOut[idxLO].HalfStrip : 0}</td>
                            <td align="right">${idxLO >= 0 ? data.LeftOut[idxLO].NG : 0}</td>
                            <td align="right">${idxRI >= 0 ? data.RightIn[idxRI].NoStrip : 0}</td>
                            <td align="right">${idxRI >= 0 ? data.RightIn[idxRI].HalfStrip : 0}</td>
                            <td align="right">${idxRI >= 0 ? data.RightIn[idxRI].NG : 0}</td>
                            <td align="right">${idxRO >= 0 ? data.RightOut[idxRO].NoStrip : 0}</td>
                            <td align="right">${idxRO >= 0 ? data.RightOut[idxRO].HalfStrip : 0}</td>
                            <td align="right">${idxRO >= 0 ? data.RightOut[idxRO].NG : 0}</td>
                            <td align="right">${(((idxLI >= 0 ? data.LeftIn[idxLI].Former : 0) + (idxLO >= 0 ? data.LeftOut[idxLO].Former : 0) + (idxRI >= 0 ? data.RightIn[idxRI].Former : 0) + (idxRO >= 0 ? data.RightOut[idxRO].Former : 0)) / 1140).toFixed(0)}</td>
                        </tr>`
            }
        } else {
            html += `<tr><td colspan="14" align="center">No Data</td></tr>`
        }
        html += `</tbody></table>`
    }
    
    $('#tblDiv').html(html)

    $("table").tableExport({ 
        filename: `Autos_${moment().format('x')}`, 
        bootstrap: true, 
        position: "bottom",  
        formats: ["xlsx"],
    })

    $("caption").removeClass("btn-toolbar")

    $('#autosTbl').DataTable({
        order: [
            [ 0, "asc" ],
            [ 1, "asc"]
        ]
    })

    /*
    var table = $('#tankTbl').DataTable({
        buttons: [
            {
                extend: 'copy',
                text: '<i class="far fa-copy"></i>',
                titleAttr: 'Copy',
                title: 'Tank LTX'
            },
            {
                extend: 'excel',
                text: '<i class="far fa-file-excel"></i>',
                titleAttr: 'Excel',
                title: 'Tank LTX'
            },
            {
                extend: 'pdf',
                text: '<i class="far fa-file-pdf"></i>',
                titleAttr: 'PDF',
                title: 'Tank LTX'
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'Print',
                title: 'Tank LTX'
            },
        ],
        order: [
            [ 0, "asc" ],
            [ 1, "asc"]
        ]
    })
    $('#exportDiv').empty()
    table.buttons().container().appendTo( '#exportDiv' )
    */
})

$(() => {
    if (!$("a[href$='/report']").hasClass('active')) {
        $("a[href$='/report']").addClass('active')
    }

    $('#selDate').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        startDate: moment().startOf('day'),
        endDate: moment(),
        maxDate: moment(),
        locale: {
          format: 'DD/MM/YY HH:mm'
        }
    })
})