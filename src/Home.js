import React, { useState, useEffect } from "react";
import "./styles.css";

const exerciseCategories = ["Cardio", "Strength", "Flexibility", "Endurance"];

function Home() {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [category, setCategory] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [duration, setDuration] = useState(0);
  const [goals, setGoals] = useState({
    weightGoal: 0,
    workoutCountGoal: 0,
  });
  const [workoutHistory, setWorkoutHistory] = useState([]);

  // Retrieve saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("workoutHistory");
    if (savedData) {
      setWorkoutHistory(JSON.parse(savedData));
    }
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save data to localStorage whenever there's a change in workout history or goals
  useEffect(() => {
    localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory));
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [workoutHistory, goals]);

  const handleAddExercise = () => {
    if (!exerciseName || !category) {
      alert("Please fill in all fields!");
      return;
    }

    const newExercise = {
      name: exerciseName,
      category,
      sets,
      reps,
      weight,
      duration,
      date: new Date().toLocaleString(),
    };

    setWorkoutHistory([newExercise, ...workoutHistory]);
    setExerciseName("");
    setCategory("");
    setSets(0);
    setReps(0);
    setWeight(0);
    setDuration(0);
  };

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoals({ ...goals, [name]: value });
  };

  // Calculate weekly summary
  const getWeeklySummary = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyExercises = workoutHistory.filter(
      (exercise) => new Date(exercise.date) >= weekAgo
    );

    const totalTime = weeklyExercises.reduce(
      (acc, exercise) => acc + exercise.duration,
      0
    );
    const topExercise = weeklyExercises.reduce(
      (prev, current) => (prev.weight > current.weight ? prev : current),
      {}
    );
    return { totalTime, topExercise };
  };

  const { totalTime, topExercise } = getWeeklySummary();

  return (
    <div>
      <h1>Workout Logger</h1>
      <h2>Add Exercises</h2>
      <div>
        <label>Exercise Name: </label>
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
      </div>
      <div>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {exerciseCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Sets: </label>
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Reps: </label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Weight (kg): </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Duration (minutes): </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>
      <button onClick={handleAddExercise}>Add Exercise</button>

      <h2>Workout Goals</h2>
      <div>
        <label>Weight Goal (kg): </label>
        <input
          type="number"
          name="weightGoal"
          value={goals.weightGoal}
          onChange={handleGoalChange}
        />
      </div>
      <div>
        <label>Workout Count Goal: </label>
        <input
          type="number"
          name="workoutCountGoal"
          value={goals.workoutCountGoal}
          onChange={handleGoalChange}
        />
      </div>

      <h2>Weekly Summary</h2>
      <div>
        <p>Total Workout Time: {totalTime} minutes</p>
        <p>
          Top Exercise: {topExercise.name} -{" "}
          {topExercise.weight ? `Weight: ${topExercise.weight}kg` : ""}
        </p>
      </div>

      <h2>Workout History</h2>
      <ul>
        {workoutHistory.map((exercise, index) => (
          <li key={index}>
            <strong>{exercise.name}</strong> ({exercise.category}) -{" "}
            {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} kg,{" "}
            {exercise.duration} minutes
            <br />
            <small>{exercise.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
