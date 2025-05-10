import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements AfterViewInit {
  barChartData = [
    { name: 'Week 1', value: 1200 },
    { name: 'Week 2', value: 1500 },
    { name: 'Week 3', value: 1000 },
    { name: 'Week 4', value: 1700 },
  ];

  lineChartData = [
    {
      name: 'Customers',
      series: [
        { name: 'Day 1', value: 50 },
        { name: 'Day 2', value: 120 },
        { name: 'Day 3', value: 70 },
        { name: 'Day 4', value: 90 },
        { name: 'Day 5', value: 150 },
      ],
    },
  ];

  donutChartData = [
    { name: 'T-Shirts', value: 940 },
    { name: 'Wardrobe', value: 790 },
    { name: 'Neutrals', value: 740 },
  ];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  displayedColumns: string[] = ['name', 'date', 'total', 'status'];
  dataSource = new MatTableDataSource<OrderModel>(Orders);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface OrderModel {
  image?: string;
  name: string;
  date: string;
  total: number;
  status: string;
}

const Orders: OrderModel[] = [
  {
    name: 'Mens Black T-Shirts',
    date: '20 Mar, 2023',
    total: 300,
    status: 'Processing',
  },
  {
    name: 'Essential Neutrals',
    date: '19 Mar, 2023',
    total: 22,
    status: 'Processing',
  },
  {
    name: 'Sleek and Cozy Black',
    date: '7 Feb, 2023',
    total: 57,
    status: 'complete',
  },
  {
    name: 'MOCKUP Black',
    date: '29 Jan, 2023',
    total: 30,
    status: 'complete',
  },
  {
    name: 'Monochromatic Wardrobe',
    date: '27 Jan, 2023',
    total: 27,
    status: 'complete',
  },
];
