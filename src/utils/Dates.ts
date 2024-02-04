export const today = new Date().toISOString().split('T')[0];

export function fistDateMonthBefore() {
  const hoje = new Date();
  const todayYear = new Date().getFullYear(); //Necessario para não mexer no Hoje

  hoje.setDate(1); // Define o dia como 1 primeiro
  hoje.setMonth(hoje.getMonth() - 1); // Subtrai um mês

  // Verifica se estamos lidando com o mês de janeiro
  if (hoje.getMonth() === 11) {
    hoje.setFullYear(todayYear - 1);
  }

  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const ano = String(hoje.getFullYear()).padStart(2, '0');

  const primeiroDia = `${ano}-${dia}-${mes}`;
  return primeiroDia;
}

const dataAtual = new Date();
dataAtual.setDate(0);
export const lastDayMounthBefore = dataAtual;

export const barDate = (data: string) => {
  const partes = data?.slice(0, 10)?.split('-');
  const dataInvertida = `${partes[2]}/${partes[1]}/${partes[0]}`;
  return data ? dataInvertida : '';
};

export const snakeDate = (data: string) => {
  const partes = data.split('/');
  if (partes.length !== 3) {
    return 'Data inválida';
  }

  const dia = partes[0];
  const mes = partes[1];
  const ano = partes[2];

  // Use o formato 'yyyy-mm-dd' para inverter a data
  const dataInvertida = `${ano}-${mes}-${dia}`;
  return dataInvertida;
};
