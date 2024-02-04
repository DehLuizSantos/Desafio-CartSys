import React, { useCallback } from 'react';
import { useTheme } from '@emotion/react';
import ReactEcharts from 'echarts-for-react';
import { ResumoNFCEType } from '../../../pages/NFCE/interface';
import * as S from './styles';
type CandleEstatisticsProps = {
  colorScheme: string;
  data: ResumoNFCEType[];
};

export const CandleEstatistics: React.FC<CandleEstatisticsProps> = ({ colorScheme, data }) => {
  const theme = useTheme();

  const formatArray = useCallback(() => {
    const valor = data?.map((produto) => {
      return produto.valor;
    });

    const datas = data.map((dado) => {
      return dado.data;
    });
    const datasFormated = data.map((dado) => {
      const partes = String(dado.data).split('-');
      return `${partes[2]}/${partes[1]}`;
    });
    return { valor, datasFormated, datas };
  }, [data]);

  const changeOption = useCallback(() => {
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          const value = params[0].value;
          const formatedName = `${params[0].name}`;
          const formattedValue = `R$ ${value
            .toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
          return `${formatedName} - ${formattedValue}`;
        },
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['bar', 'line'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      grid: {
        left: '0%',
        right: '1%',
        bottom: '0%',
        containLabel: true,
      },

      xAxis: {
        type: 'category',
        data: formatArray().datas.map((dado) => {
          const partes = String(dado).split('-');
          return `${partes[2]}/${partes[1]}`;
        }),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: 'R${value}', // Adicione esta linha para exibir o símbolo de cifrão no eixo Y
        },
      },
      series: [
        {
          type: 'line',
          stack: 'Total',
          data: formatArray().valor,
          label: {
            show: false, // Exibe o valor acima da barra
            position: 'top', // Posição do valor
            formatter: (params: any) => `R$ ${params.value}`,
            color: colorScheme === 'dark' ? theme.colors.gray['5'] : theme.colors.dark['5'],
            fontSize: theme.fontSizes.lg,
            weight: 'bold',
          },
        },
      ],
    };

    return option;
  }, [formatArray]);
  return (
    <S.ProductsEstatisticsWrapper>
      <ReactEcharts theme={colorScheme} option={changeOption()} />
    </S.ProductsEstatisticsWrapper>
  );
};
