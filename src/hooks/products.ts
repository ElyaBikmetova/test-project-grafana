import React, { useEffect, useContext, useState, FC } from 'react';
import {
    DataFrame,
    MutableDataFrame,
    applyFieldOverrides,
    FieldType,
    ThresholdsMode,
    createTheme
} from '@grafana/data';
import axios from 'axios';
import { TableCellDisplayMode } from '@grafana/ui';
import { IData, IProduct } from '../interfaces/Table';

export function useProducts() {
    const theme = useContext(React.createContext(createTheme({ colors: { mode: 'light' } })));
    const [products, setProducts] = useState<DataFrame>(getData());
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        const response = await axios.get<IData>('https://dummyjson.com/products');
        setProducts(getData(response.data.products));
        setLoading(false);
    }

    function getData(rows?: IProduct[]): DataFrame {
        const fields = [
            { 
                name: 'Name', 
                type: FieldType.string, 
                values: [],
                config: {
                    custom: {
                        displayMode: TableCellDisplayMode.ColorText
                    }
                }
            },
            { 
                name: 'Price',
                type: FieldType.number,
                values: [],
                config: {
                    color: {mode: "thresholds"},
                    decimals: 2,
                    custom: {
                        width: 120,
                        align: 'center',
                        displayMode: TableCellDisplayMode.ColorBackground
                    },
                    thresholds: {
                        mode: ThresholdsMode.Absolute,
                        steps: [
                          {
                            color: 'green',
                            value: 0
                          },
                          {
                            color: 'red',
                            value: 500
                          }
                        ]
                      }
                }
            },
            {
                name: 'Rating',
                type: FieldType.number,
                values: [],
                config: {
                    min: 0,
                    max: 5,
                    custom: {
                        width: 200,
                        align: 'center',
                        displayMode: TableCellDisplayMode.GradientGauge
                    },
                    thresholds: {
                        steps: [
                            {
                              color: 'blue',
                              value: -Infinity,
                            },
                            {
                              color: 'green',
                              value: 3,
                            },
                          ],
                          mode: ThresholdsMode.Percentage
                    }
                }
            },
            { 
                name: 'Description', 
                type: FieldType.string, 
                values: [],
                config: {
                    custom: {
                        displayMode: TableCellDisplayMode.ColorText
                    }
                }
            },
            {
                name: 'Image',
                type: FieldType.string,
                values: [],
                config: {
                    custom: {
                        align: 'center',
                        width: 140,
                        displayMode: TableCellDisplayMode.Image
                    }
                }
            }
        ];
        const data = new MutableDataFrame({ fields });

        if (rows) {
            rows.map((row) => data.appendRow([row.title, row.price, row.rating, row.description, row.thumbnail]));
        }

        return applyFieldOverrides({
            data: [data],
            fieldConfig: { overrides: [],  defaults: {} },
            theme,
            replaceVariables: (value: string) => value
        })[0];
    }

    useEffect(() => {
        getProducts();
    }, [])

    return {products, loading}
}