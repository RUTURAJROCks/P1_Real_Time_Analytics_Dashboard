from typing import List, Callable, Any
import math

class SegmentTree:
    """Generic Segment Tree supporting any merge operation."""
    
    def __init__(self, data: List[float], merge_fn: Callable, identity: float):
        """
        data: Initial array
        merge_fn: Function to combine two nodes (e.g., max, sum, min)
        identity: Identity element for merge (0 for sum, -inf for max, inf for min)
        """
        self.n = len(data)
        self.merge = merge_fn
        self.identity = identity
        self.tree = [identity] * (4 * self.n)
        self._build(data, 1, 0, self.n - 1)
    
    def _build(self, data: List[float], node: int, start: int, end: int):
        if start == end:
            self.tree[node] = data[start]
        else:
            mid = (start + end) // 2
            self._build(data, 2 * node, start, mid)
            self._build(data, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.merge(self.tree[2 * node], self.tree[2 * node + 1])
    
    def update(self, idx: int, val: float):
        self._update(1, 0, self.n - 1, idx, val)
    
    def _update(self, node: int, start: int, end: int, idx: int, val: float):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self._update(2 * node, start, mid, idx, val)
            else:
                self._update(2 * node + 1, mid + 1, end, idx, val)
            self.tree[node] = self.merge(self.tree[2 * node], self.tree[2 * node + 1])
    
    def query(self, l: int, r: int) -> float:
        return self._query(1, 0, self.n - 1, l, r)
    
    def _query(self, node: int, start: int, end: int, l: int, r: int) -> float:
        if r < start or end < l:
            return self.identity
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        left_result = self._query(2 * node, start, mid, l, r)
        right_result = self._query(2 * node + 1, mid + 1, end, l, r)
        return self.merge(left_result, right_result)


class MetricsEngine:
    """Time-series metrics with multiple Segment Trees."""
    
    def __init__(self, window_size: int = 3600):  # 1 hour in seconds
        self.window_size = window_size
        self.data = [0.0] * window_size
        self.current_idx = 0
        
        # Multiple segment trees for different aggregations
        self.sum_tree = SegmentTree(self.data, lambda a, b: a + b, 0)
        self.max_tree = SegmentTree(self.data, max, float('-inf'))
        self.min_tree = SegmentTree(self.data, min, float('inf'))
    
    def add_metric(self, value: float):
        """Add new metric value (circular buffer)."""
        self.data[self.current_idx] = value
        self.sum_tree.update(self.current_idx, value)
        self.max_tree.update(self.current_idx, value)
        self.min_tree.update(self.current_idx, value)
        self.current_idx = (self.current_idx + 1) % self.window_size
    
    def query_range(self, start_offset: int, end_offset: int):
        """Query metrics for range [now - start_offset, now - end_offset]."""
        # Convert offsets to indices
        start_idx = (self.current_idx - start_offset) % self.window_size
        end_idx = (self.current_idx - end_offset) % self.window_size
        
        # Handle wraparound
        if start_idx <= end_idx:
            return {
                'sum': self.sum_tree.query(start_idx, end_idx),
                'max': self.max_tree.query(start_idx, end_idx),
                'min': self.min_tree.query(start_idx, end_idx),
                'avg': self.sum_tree.query(start_idx, end_idx) / (end_idx - start_idx + 1) if (end_idx - start_idx + 1) > 0 else 0
            }
        else:
            # Wraparound: query [start, window_size-1] + [0, end]
            sum1 = self.sum_tree.query(start_idx, self.window_size - 1)
            sum2 = self.sum_tree.query(0, end_idx)
            max1 = self.max_tree.query(start_idx, self.window_size - 1)
            max2 = self.max_tree.query(0, end_idx)
            min1 = self.min_tree.query(start_idx, self.window_size - 1)
            min2 = self.min_tree.query(0, end_idx)
            count = (self.window_size - start_idx) + end_idx + 1
            total_sum = sum1 + sum2
            return {
                'sum': total_sum,
                'max': max(max1, max2),
                'min': min(min1, min2),
                'avg': total_sum / count if count > 0 else 0
            }
