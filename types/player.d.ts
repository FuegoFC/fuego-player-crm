export interface Player {
    id: number;
    first_name: string;
    last_name: string;
    positions: number;
    email: string;
    phone: string;
    goals_scored: number;
    assists: number;
    minutes_played: number;
    shots_on_goal: number;
    shots_off_target: number;
    pass_completion_percent: number;
    tackles: number;
    interceptions: number;
    fouls_committed: number;
    fouls_received: number;
    yellow_cards: number;
    red_cards: number;
    height: Height;
    weight: number;
    distance_covered: number;
    speed_forty_yard: number;
    endurance_beep_test: number;
    strength_bench_press: number;
    notes: string;
    practices?: (PracticesEntity)[] | null;
  }
  export interface Height {
    feet: number;
    inches: number;
  }
  export interface PracticesEntity {
    date: string;
    stats: Stats;
  }
  export interface Stats {
    pass_completion_percent: number;
    goals_scored: number;
    assists: number;
    minutes_played: number;
    shots_on_goal: number;
    shots_off_target: number;
    interceptions: number;
    fouls_committed: number;
    fouls_received: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
  }
  