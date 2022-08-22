import * as React from 'react';
import ReactECharts from "echarts-for-react";
import styles from './chart.module.scss';
var Chart = function (_a) {
    var _b = _a.total, total = _b === void 0 ? 0 : _b, _c = _a.pending, pending = _c === void 0 ? 0 : _c, _d = _a.completed, completed = _d === void 0 ? 0 : _d;
    var option = {
        tooltip: {
            trigger: "item",
        },
        legend: {
            top: "5%",
            left: "center",
        },
        series: [
            {
                name: "Reports",
                type: "pie",
                radius: "50%",
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "20",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                color: [
                    "#FFC423",
                    "#A09E9E",
                    "#006993",
                ],
                data: [
                    { value: total, name: "Total Requests" },
                    { value: pending, name: "Pending Requests" },
                    { value: completed, name: "Completed Requests" },
                ],
            },
        ],
    };
    return (React.createElement("div", { className: styles.charts },
        React.createElement(ReactECharts, { option: option, style: { height: '700px', width: '100%' } })));
};
export default Chart;
//# sourceMappingURL=index.js.map