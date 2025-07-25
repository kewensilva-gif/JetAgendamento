import TaskList from '../components/TaskList';

const appStyle: React.CSSProperties = {
  fontFamily: 'sans-serif',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
};

function DashboardPage() {
  return (
    <div style={appStyle}>
      <h1 className='text-3xl font-bold text-center text-gray-90 mb-4'>Painel de Tarefas</h1>
      <TaskList />
    </div>
  )
}

export default DashboardPage