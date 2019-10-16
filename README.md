# Speakeltongue
> "Well sure, Harry Potter can speak parseltongue. But can he parse Speakeltongue?"

Speakeltongue is an adaptation of [brainfuck](https://esolangs.org/wiki/Brainfuck), wherein all commands are sounds or movements that might be made by a snake.

## Commands

`S`
Add 1 to scale

`s`
Subtract 1 from scale

`zig`
Point 1 scale down the snake (add more i's to go further)

`zag`
Point 1 scale further up the snake (add more a's to go further) (can't go past the head)

`hiss`
Output the current scale's number as a UTF-16 character (A = 65)

`gulp`
'Eat' the first character in 'food', create a new scale with its UTF-16 number

`chew`
Move down the snake to the next empty scale

`munch`
Same as "chew", but write down the number of scales you skipped

`shake`
Start a loop, unless the current scale is equal to 0

`rattle`
Return to the start of the loop, unless the current scale is equal to 0

> All commands can be elongated, which sometimes changes their effect! For example, SSSSS adds 5 to the current scale, guuuuulp eats 5 characters of food, and HISSSSSSSSSS outputs the current scale's value 9 times.
