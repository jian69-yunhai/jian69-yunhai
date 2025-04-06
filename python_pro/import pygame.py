import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
SCREEN_WIDTH = 300
SCREEN_HEIGHT = 600
BLOCK_SIZE = 30
GRID_WIDTH = SCREEN_WIDTH // BLOCK_SIZE
GRID_HEIGHT = SCREEN_HEIGHT // BLOCK_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
COLORS = [
    (0, 255, 255),  # Cyan
    (255, 165, 0),  # Orange
    (0, 0, 255),    # Blue
    (255, 0, 0),    # Red
    (0, 255, 0),    # Green
    (128, 0, 128),  # Purple
    (255, 255, 0)   # Yellow
]

# Tetromino shapes
SHAPES = [
    [[1, 1, 1, 1]],  # I
    [[1, 1, 1], [0, 1, 0]],  # T
    [[1, 1], [1, 1]],  # O
    [[0, 1, 1], [1, 1, 0]],  # S
    [[1, 1, 0], [0, 1, 1]],  # Z
    [[1, 0, 0], [1, 1, 1]],  # L
    [[0, 0, 1], [1, 1, 1]]   # J
]

# Game grid
grid = [[0 for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]

def draw_grid(surface):
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            if grid[y][x] != 0:
                pygame.draw.rect(surface, COLORS[grid[y][x] - 1], (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))

def draw_tetromino(surface, shape, offset):
    for y, row in enumerate(shape):
        for x, block in enumerate(row):
            if block:
                pygame.draw.rect(surface, COLORS[shape[0][0] - 1], ((x + offset[0]) * BLOCK_SIZE, (y + offset[1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))

def check_collision(shape, offset):
    for y, row in enumerate(shape):
        for x, block in enumerate(row):
            if block:
                if (x + offset[0] < 0 or x + offset[0] >= GRID_WIDTH or
                    y + offset[1] >= GRID_HEIGHT or grid[y + offset[1]][x + offset[0]] != 0):
                    return True
    return False

def merge_tetromino(shape, offset):
    for y, row in enumerate(shape):
        for x, block in enumerate(row):
            if block:
                grid[y + offset[1]][x + offset[0]] = shape[0][0]

def clear_lines():
    global grid
    new_grid = [row for row in grid if any(block == 0 for block in row)]
    lines_cleared = GRID_HEIGHT - len(new_grid)
    new_grid = [[0 for _ in range(GRID_WIDTH)] for _ in range(lines_cleared)] + new_grid
    grid = new_grid

def main():
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pygame.time.Clock()
    current_shape = random.choice(SHAPES)
    current_offset = [GRID_WIDTH // 2 - len(current_shape[0]) // 2, 0]

    while True:
        screen.fill(BLACK)
        draw_grid(screen)
        draw_tetromino(screen, current_shape, current_offset)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    current_offset[0] -= 1
                    if check_collision(current_shape, current_offset):
                        current_offset[0] += 1
                if event.key == pygame.K_RIGHT:
                    current_offset[0] += 1
                    if check_collision(current_shape, current_offset):
                        current_offset[0] -= 1
                if event.key == pygame.K_DOWN:
                    current_offset[1] += 1
                    if check_collision(current_shape, current_offset):
                        current_offset[1] -= 1
                        merge_tetromino(current_shape, current_offset)
                        clear_lines()
                        current_shape = random.choice(SHAPES)
                        current_offset = [GRID_WIDTH // 2 - len(current_shape[0]) // 2, 0]
                        if check_collision(current_shape, current_offset):
                            print("Game Over")
                            pygame.quit()
                            return

        current_offset[1] += 1
        if check_collision(current_shape, current_offset):
            current_offset[1] -= 1
            merge_tetromino(current_shape, current_offset)
            clear_lines()
            current_shape = random.choice(SHAPES)
            current_offset = [GRID_WIDTH // 2 - len(current_shape[0]) // 2, 0]
            if check_collision(current_shape, current_offset):
                print("Game Over")
                pygame.quit()
                return

        pygame.display.flip()
        clock.tick(10)

if __name__ == "__main__":
    main()