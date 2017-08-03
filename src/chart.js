import exporter from 'highcharts-export-server';

exporter.initPool();

function BuildGraph(data1, data2) {
    return new Promise(function(resolve, reject) {
        var exportSettings = {
            type: 'png',
            options: {
                title: {
                    text: 'My Chart'
                },
                xAxis: {
                    type: 'datetime',
                },
                series: [
                    {
                        type: 'line',
                        data: data1,
                        name: 'Buy Price',
                    },
                    {
                        type: 'line',
                        data: data2,
                        name: 'Sell Price',
                    }
                ]
            }
        };

        exporter.export(exportSettings, function (err, res) {
            resolve(Buffer.from(res.data, 'base64'));
        });
    })
}

export {BuildGraph};

function EndPool() {
    exporter.killPool();
    process.exit(1);
}

export {EndPool};
