import axios from 'axios';
import { setIssues } from '../../redux/issues/issuesSlice.js';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';
import { User } from 'types/types.js';
import {
  RepoInfoStars,
  RepoInfoStarsWrapper,
  RepoInfoText,
  RepoInfoWrapper,
  StyledInput,
  StyledSearchButton,
  StyledSearchForm,
  StyledSearchFormWrapper,
} from './Search.styled.tsx';
import { Icon } from 'semantic-ui-react';

export const Search: React.FC = () => {
  const [repoOwnerData, setRepoOwnerData] = useState<User>(null);
  const [splitedRepoUrl, setSplitedRepoUrl] = useState<string[]>([]);
  const [repoStarsCounter, setRepoStarsCounter] = useState<number>(null);

  const dispatch = useDispatch();

  const onSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const userInput = (e.target as HTMLInputElement)[0].value;
    try {
      const repoIssues = await axios.get(
        `https://api.github.com/repos/${userInput.split('/')[3]}/${
          userInput.split('/')[4]
        }/issues?state=all`
      );

      const repo = await axios.get(repoIssues.data[0].repository_url);

      setRepoStarsCounter(repo.data.stargazers_count);
      setRepoOwnerData(repoIssues.data[0]?.user);
      setSplitedRepoUrl(userInput.split('/'));
      if (!localStorage.getItem(repoIssues.data[0].repository_url)) {
        dispatch(setIssues(repoIssues.data));
      } else {
        const localeIssues = JSON.parse(
          localStorage.getItem(repoIssues.data[0].repository_url)
        );
        dispatch(setIssues(localeIssues));
      }
    } catch (error) {
      console.log('error in getting issues', error);
    }
  };

  return (
    <StyledSearchFormWrapper>
      <StyledSearchForm onSubmit={e => onSearch(e)}>
        <StyledInput required placeholder="Enter repo link" type="text" />
        <StyledSearchButton type="submit">Load issues</StyledSearchButton>
      </StyledSearchForm>
      {repoOwnerData && (
        <RepoInfoWrapper>
          <RepoInfoText>
            <a href={`https://github.com/${splitedRepoUrl[3]}`}>
              {' '}
              {splitedRepoUrl[splitedRepoUrl.length - 2]
                ? `${splitedRepoUrl[splitedRepoUrl.length - 2]} > `
                : null}
            </a>

            <a href={splitedRepoUrl.join('/')}>
              {splitedRepoUrl[splitedRepoUrl.length - 1]}
            </a>
          </RepoInfoText>
          <RepoInfoStarsWrapper>
            <Icon size="tiny" color="yellow" name="star" />
            <RepoInfoStars>
              {' '}
              {repoStarsCounter >= 1000
                ? `${Math.floor(repoStarsCounter / 1000)} K stars`
                : `${repoStarsCounter} stars`}
            </RepoInfoStars>
          </RepoInfoStarsWrapper>
        </RepoInfoWrapper>
      )}
    </StyledSearchFormWrapper>
  );
};
