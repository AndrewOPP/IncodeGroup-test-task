import { Column } from '../../components/Column/Column';
import { useSelector } from 'react-redux';
import { selectAllIssues } from '../../redux/issues/issuesSelectors';

export const ColumnsView: React.FC = () => {
  const issues = useSelector(selectAllIssues);
  console.log(issues);

  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <Column
        issues={issues.filter(issue => issue.state === 'open')}
        title={'ToDo'}
      />
      <Column
        issues={issues.filter(issue => issue.assignee)}
        title={'In Progress'}
      />
      <Column
        issues={issues.filter(issue => issue.state === 'closed')}
        title={'Done'}
      />
    </div>
  );
};
