# Advent of Code

## Generating a new day

```bash
#via npm run:
npm run new-day -- --year=2024 --day=4
# or the full script:
npx nx generate ./tools/plugins:new-day --year=2024 --day=3
```

## Running a day

```bash
npm run aoc -- <day> <part> <input>
```

- run a day:

  ```bash
  npm run aoc -- 3 a
  # 3 is the day to run
  # a the part of the day to run
  ```

- run a day with specific input/output

  ```bash
  npm run aoc -- 3 a test
  # 3 is the day to run
  # a the part of the day to run
  # test is the prefix for input/output files in the day's dir
    test-input.txt
    test-output-a.txt
  ```
