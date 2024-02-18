import { useForm } from 'react-hook-form';

function ToDoList() {
  // react-hook-form 사용
  const { register } = useForm();
  console.log(register);

  return (
    <div>
      <form>
        <input type="text" placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
