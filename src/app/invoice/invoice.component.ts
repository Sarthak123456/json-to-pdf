import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DataService } from '../data.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  sum = 5408;
  public response: any;
  constructor(private service: DataService) {
  }
  ngOnInit() {
    this.service.getData().subscribe(res => this.response = res);
    }


    onSubmit() {
      let total = 0;
      const g = this.response.data[0].invoice_items.map((item ) => item.item_total);
      for (let i = 0; i < g.length ; i ++) {
         total += (parseFloat(g[i]));
        }
        const x = this.response.data[0];
        const name = [];
        const rate = [];
        const qty = [];
        const tot = [];
        const tax = [];
        const disc = [];
      x.invoice_items.map(function(item) {
        name.push({ text : item.item_name});
       rate.push( { text : item.item_rate} );
        qty.push({ text : item.item_qty });
        tot.push( { text : item.item_total});
        tax.push({ text : item.item_tax_rate}),
        disc.push({ text: item.item_discount});
    });
    console.log(tot);
      // let y = x.map(function(item) { return item.tnc; });
      const docDefinition = {
        content: [
          { text: x.company_name.toUpperCase() , style: 'header' },
          // { text : 'INVOICE', style : 'logo' , margin: [ 5, 2, 10, 20 ]},
          {
            columns: [
              {
                          // % width
                          width: '40%',
                           text : 'INVOICE' , bold: true , fontSize: 24
                        },
                        {
                          // % width
                          width: '30%',
                          // tslint:disable-next-line:max-line-length
                          text: 'Bill To:' , bold : true
                        },
                        {
                          // % width
                          width: '30%',
                          text: 'Ship To:',
                           bold : true
                        }
                      ],
                      // optional space between columns
                      columnGap: 100
                    },
                    {
                      columns: [
                        {
                                    // % width
                                    width: '40%',
                                     text :  ' '
                                  },
                                  {
                                    // % width
                                    width: '30%',
                                    // tslint:disable-next-line:max-line-length
                                    text:  x.client_company  + '\n' + x.client_address + ',' + x.client_address_2 + '\n'
                                    + x.client_address_3 + ', ' + x.client_country  + '\n' + x.client_address_4 + '\n'
                                  },
                                  {
                                    // % width
                                    width: '30%',
                                    text: x.client_shipping_address  + ',' + x.client_shipping_address_2 + '\n' +
                                     x.client_shipping_address_3 + ', ' + x.client_country  + '\n' + x.client_address_4 + '\n'
                                  }
                                ],
                                // optional space between columns
                                columnGap: 100
                              },

                    {
                      columns: [
                        {
                                    // % width
                                    width: '100%',
                                     text : '   ' ,  marginTop: 20
                                  }
                                ]
                          },

                    {
                      columns: [
                        {
                                    // % width
                                    width: '25%',
                                     text : 'Invoice #:' , bold : true
                                  },
                                  {
                                    // % width
                                    width: '25%',
                                    // tslint:disable-next-line:max-line-length
                                    text: 'Invoice Date:' , bold : true
                                  },
                                  {
                                    // % width
                                    width: '25%',
                                    text: 'Client Name:' , bold : true
                                  },
                                  {
                                    // % width
                                    width: '25%',
                                    text: 'Transport Method:', bold : true
                                  }
                                ],
                                // optional space between columns
                                columnGap: 100
                              },

                              {
                                columns: [
                                  {
                                              // % width
                                              width: '25%',
                                               text : x.invoice_number
                                            },
                                            {
                                              // % width
                                              width: '25%',
                                              // tslint:disable-next-line:max-line-length
                                              text: x.invoice_date
                                            },
                                            {
                                              // % width
                                              width: '25%',
                                              text: x.client_company
                                            },
                                            {
                                              // % width
                                              width: '25%',
                                              text:  x.transport_mode
                                            }
                                          ],
                                          // optional space between columns
                                          columnGap: 100
                                        },
                                        {
                                          columns: [
                                            {
                                                        // % width
                                                        width: '100%',
                                                         text : '   ' ,  marginTop: 20
                                                      }
                                                    ]
                                              },
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*' , '*' , '*' , '*' , '*' , '*'],
              body: [
                [ {text: 'Name', bold : true } , {text: 'Rate', bold : true },
                {text: 'Quantity', bold : true } , {text: 'Tax', bold : true } ,
                {text: 'Discount', bold : true } , {text: 'Total', bold : true } ],
               [ name, rate, qty , tax , disc , tot]
              ]
            }
          },
          {
            columns: [
              {
                          // % width
                          width: '100%',
                           text : '    ' , style : 'content'
                        }
                      ]
                },

                {
                  columns: [
                    {
                      // % width
                      width: '50%',
                      text: 'Terms & Conditions', bold : true , alignment : 'justify'
                    },
                              {
                                // % width
                                width: '50%',
                                // tslint:disable-next-line:max-line-length
                                text: 'Amount Due', bold : true , alignment : 'justify'
                              }
                            ],
                            // optional space between columns
                            columnGap: 100
                          },
                {
                  columns: [
                    {
                      // % width
                      width: '50%',
                      text: x.tnc.toUpperCase() , bold : true , alignment : 'justify'
                    },
                              {
                                // % width
                                width: '50%',
                                // tslint:disable-next-line:max-line-length
                                text: total, bold : true , fontSize : 24 , alignment : 'justify'
                              }
                            ],
                            // optional space between columns
                            columnGap: 100
                          },
                          {
                            columns: [
                              {
                                          // % width
                                          width: '100%',
                                           text : '    ' , style : 'header'
                                        }
                                      ]
                                },
                                {
                                  columns: [
                                    {
                                      // % width
                                      width: '50%',
                                      text: 'Contact Details', bold : true , alignment : 'justify'
                                    },
                                              {
                                                // % width
                                                width: '50%',
                                                // tslint:disable-next-line:max-line-length
                                                text: 'Thank You!' , bold : true , alignment : 'justify' , fontSize: 24
                                              }
                                            ],
                                            // optional space between columns
                                            columnGap: 100
                                          },
                                {
                                  columns: [
                                    {
                                      // % width
                                      width: '50%',
                                      text: x.company_email , alignment : 'justify' , fontSize: 12
                                    },
                                              {
                                                // % width
                                                width: '50%',
                                                // tslint:disable-next-line:max-line-length
                                                text: ''
                                              }
                                            ],
                                            // optional space between columns
                                            columnGap: 100
                                          },


        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            alignment: 'center',
            marginTop: 50,
            marginBottom : 50,
          },
          content : {
            marginTop: 30,
            marginBottom : 30,
          },
          logo: {
            fontSize: 24,
            bold: true,
            alignment: 'left',
          },
          anotherStyle: {
            bold: true,
            fontSize: 15,
            marginTop: 50,
            marginBottom : 50,
          },
          border : {
            decoration : 'underline',
          }
        }
      };
      pdfMake.createPdf(docDefinition).open();
    }
Download() {
  alert('Download');
}
}
