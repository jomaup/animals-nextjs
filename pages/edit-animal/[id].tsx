import Router, { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AnimalsState } from "../../store/animals/animalReducer";
import { editAnimal } from "../../store/animals/use-cases/edit-animal.use-case";
import { AppState } from "../../store/rootStore";

const EditAnimal = () => {
  interface IFormInputs {
    id: string;
    name: string;
    age: number;
    type: string;
  }

  type ParamTypes = {
    id: string;
  };

  const dispatch = useDispatch();

  const animals = useSelector<AppState, AnimalsState>(
    (state) => state.animalsReducer
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const router = useRouter();

  const { id } = router.query;

  const animal = animals.animals.find((animal) => animal.id === id);

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    if (id) {
      data.id = id as string;
    }
    dispatch(editAnimal(data) as any);
    Router.push("/liste");
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="champs">
          <h1>Editer son animal</h1>
          <br />
          <div className="inputbox">
            {errors.name && <span> Ce champ est requis</span>}
            <label>Nom : </label>
            <input
              className="border-black border-2 rounded p-0.5"
              type="text"
              defaultValue={animal?.name}
              {...register("name", {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    "Le nom de votre animal doit comporter 3 caractères au minimum",
                },
              })}
            />
          </div>

          <br />
          <br />
          <div className="inputbox">
            <label>Age : </label>
            <input
              className="border-black border-2 rounded p-0.5"
              type="number"
              defaultValue={animal?.age}
              {...register("age", { required: true })}
            />
          </div>
          <br />
          <br />
          <div className="inputbox">
            <label>Espèce d'animal :</label>
            <select
              className="border-black border-2 rounded p-0.5"
              defaultValue={animal?.type}
              {...register("type", { required: true })}
            >
              <option value="chien" defaultValue="chien">
                Chien
              </option>
              <option value="chèvre" defaultValue="chèvre">
                chèvre
              </option>
              <option value="chat" defaultValue="chat">
                chat
              </option>
            </select>
          </div>
          <br />
          <br />
          <input
            type="submit"
            className="border-black border-2 rounded p-0.5"
          />
        </div>
      </form>
    </>
  );
};

export default EditAnimal;
