import { Button, Form, Input } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledInput = styled(Input)`
  width: 100%;
  font-size: 14px;
`;
export const StyledSearchButton = styled(Button)`
  width: 20%;
  font-size: 14px;
  cursor: pointer;
`;
export const StyledSearchForm = styled(Form)`
  width: 100%;
  display: flex;
  gap: 15px;
`;
export const StyledSearchFormWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  flex-direction: column;
`;
export const RepoInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
`;
export const RepoInfoText = styled.p`
  font-size: 16px;
  color: blue;
  align-items: center;
`;
export const RepoInfoStars = styled.p`
  color: 'black';
  font-size: 20px;
`;
export const RepoInfoStarsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
