import { Issue } from 'types/types';

type Props = {
  issues: Issue[];
  title: string;
};

export const Column: React.FC<Props> = ({ title, issues }) => {
  debugger;
  return (
    <div>
      <p
        style={{
          textAlign: 'center',
          fontSize: '36px',
          marginBottom: '20px',
        }}
      >
        {title}
      </p>
      <div
        style={{
          width: '350px',
          minHeight: '550px',
          backgroundColor: 'lightgray',
          padding: '20px',
        }}
      >
        {issues.map((issue, index) => {
          return (
            <div
              key={index}
              style={{
                border: '1px solid black',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
              }}
            >
              <p>{issue.title}</p>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <p>{`#` + issue.number}</p>
                <p>{issue.created_at}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <p>{issue.user.login}</p>
                <p>{issue.comments}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
