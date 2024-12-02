# Advent of Code

## Generating a new day

```
npx nx generate ./tools/plugins:new-day --year=2024 --day=3
```

## Running a day

```
npm run aoc -- <day> <input>
```

- run a day:

  ```
  npm run aoc -- 3 a
  # 3 is the day to run
  # a the part of the day to run
  ```

- run a day with specific input/output

  ```
  npm run aoc -- 3 a test
  # 3 is the day to run
  # a the part of the day to run
  # test is the prefix for input/output files in the day's dir
    test-input.txt
    test-output-a.txt
  ```
