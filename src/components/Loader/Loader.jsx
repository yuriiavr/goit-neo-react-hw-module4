import css from './Loader.module.css'

const Loader = () => {
  return (
    <div className={css.loader}>
      <div style={{
        width: '80px',
        height: '80px',
        border: '5px solid #3f51b5',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}></div>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader