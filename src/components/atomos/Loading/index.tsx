import * as S from './styles';

export const Loading = () => {
  return (
    <S.LoadingWrapper>
      <S.LoadingContainer>
        <S.LoadingText>loading</S.LoadingText>
        <S.LoadingLoad></S.LoadingLoad>
      </S.LoadingContainer>
    </S.LoadingWrapper>
  );
};
