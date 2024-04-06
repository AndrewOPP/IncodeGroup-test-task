import axios from 'axios';
import { setIssues } from '../../redux/issues/issuesSlice.js';
import { useDispatch } from 'react-redux';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import { FormEvent, useState } from 'react';
import { User } from 'types/types.js';
import { selectAllIssues } from '../../redux/issues/issuesSelectors.tsx';
import { useSelector } from 'react-redux';

export const Search: React.FC = () => {
  const [repoOwnerData, setRepoOwnerData] = useState<User>(null);
  const [splitedRepoUrl, setSplitedRepoUrl] = useState<string[]>([]);
  const currentIssues = useSelector(selectAllIssues);
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

      setRepoOwnerData(repoIssues.data[0]?.user);
      setSplitedRepoUrl(userInput.split('/'));
      if (!localStorage.getItem(repoIssues.data[0].repository_url)) {
        dispatch(setIssues(repoIssues.data));
      } else {
        console.log(12312);

        const localeIssues = JSON.parse(
          localStorage.getItem(repoIssues.data[0].repository_url)
        );
        dispatch(setIssues(localeIssues));
      }
    } catch (error) {
      console.log('error in getting issues', error);
    }
  };

  // value="https://github.com/AndrewOpp/Test-task"
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <form
        style={{ width: '100%', height: 30, display: 'flex', gap: 15 }}
        onSubmit={e => onSearch(e)}
      >
        <input
          style={{ width: '100%', fontSize: 14 }}
          // value="https://github.com/AndrewOpp/Test-task"
          placeholder="Enter repo link"
          type="text"
        />
        <button
          style={{
            width: '20%',
            fontSize: 14,
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          type="submit"
        >
          Load issues
        </button>
      </form>
      {repoOwnerData && (
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <p style={{ fontSize: '14px', color: 'blue' }}>
            <a href={repoOwnerData.html_url}>
              {' '}
              {repoOwnerData?.login ? `${repoOwnerData?.login} > ` : null}
            </a>
            <a href={splitedRepoUrl.join('/')}>
              {splitedRepoUrl[splitedRepoUrl.length - 1]}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
