This project provides a collection of script utilities related to robot paths. Well, right now it includes a single
utility -- but it might include other utilities later.

## Installing

1. Install NodeJS >= 8.9.4
2. Clone this project
3. Go to project directory
4. Run `npm install`

## Reversing Path CSV Files

Paths generated by https://github.com/vannaka/Motion_Profile_Generator (v2.3.0) are always assumed to be for driving
the robot forwards.  This project includes a utility which inverts the values of the generated **detailed** csv files
to make the robot follow the path backwards.

**What it does...**

  - Renames "right" file(s) to be "left" file(s) and vice versa
  - Negates `x`, `y`, `velocity`, and `jerk` values
  
**WARNING**

**This utility does not correct `heading`.**

We are currently only using encoder values as feedback (as opposed to gyro) so the `heading` is not relevant for us; we 
chose not to alter the `heading` value for the sake of simplicity.

**WARNING**

**This utility will overwrite files in the `./path_csv_out` directory without warning.

### Path Reversal Usage

  1. Put files you want to reverse into the `./path_csv_in` project directory
  2. From the project root, run `node reversePaths`
  3. Collect the reversed files from `./path_csv_out`