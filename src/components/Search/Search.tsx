import axios from 'axios';
import { setIssues } from '../../redux/issues/issuesSlice.js';
import { useDispatch } from 'react-redux';
import { Button, Container, Form, Input } from 'semantic-ui-react';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const onSearch = async e => {
    e.preventDefault();
    const userInput = e.target.elements[0].value;
    try {
      const repoIssues = await axios.get(
        `https://api.github.com/repos/${userInput.split('/')[3]}/${
          userInput.split('/')[4]
        }/issues?state=all`
      );
      dispatch(setIssues(repoIssues.data));
    } catch (error) {
      console.log('error in getting issues', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={e => onSearch(e)}>
        <Input type="text" />
        <Button type="submit">Load issues</Button>
      </Form>
      <Container style={{ display: 'flex' }}>
        <p style={{ fontSize: '14px' }}>UserName link {`>`}</p>
        <p style={{ fontSize: '14px' }}>Repo link</p>
      </Container>
    </Container>
  );
};
